import streamlit as st
import pandas as pd
import serial
import time
import base64

# --- Configuration and Setup ---
STUDENTS_FILE = 'students.xlsx'
MENU_FILE = 'menu_items.xlsx'
SERIAL_PORT = 'COM5'
BAUD_RATE = 115200

SUCCESS_SOUND_PATH = "sounds/success.mp3"
ERROR_SOUND_PATH = "sounds/error.mp3"


# --- Helper Functions ---

# Load/Save Student Data
@st.cache_data
def load_student_data(file_path):
    try:
        return pd.read_excel(file_path)
    except FileNotFoundError:
        st.error(f"Error: The student data file '{file_path}' was not found.")
        return None

def save_student_data(df, file_path):
    try:
        df.to_excel(file_path, index=False)
    except Exception as e:
        st.error(f"Failed to save student data: {e}")

# --- UPDATED AND MORE ROBUST FUNCTION ---
@st.cache_data
def load_menu_data(file_path):
    try:
        df = pd.read_excel(file_path)
        # --- FIX: Clean the data after loading ---
        # 1. Drop any rows where 'name' or 'category' is empty/missing.
        df.dropna(subset=['name', 'category'], inplace=True)
        # 2. Ensure the 'category' column is treated as text (string).
        df['category'] = df['category'].astype(str)
        return df
    except FileNotFoundError:
        st.error(f"Error: The menu file '{file_path}' was not found. Please create it with 'name', 'price', and 'category' columns.")
        return pd.DataFrame(columns=['name', 'price', 'category'])


def save_menu_data(df, file_path):
    try:
        df.to_excel(file_path, index=False)
    except Exception as e:
        st.error(f"Failed to save menu data: {e}")

def find_account_by_unique_id(df, unique_id):
    if df is not None and 'unique_id' in df.columns:
        row = df[df['unique_id'] == unique_id]
        if not row.empty:
            return row.iloc[0].to_dict()
    return None

def update_account_balance(df, unique_id, new_balance):
    if df is not None:
        df.loc[df['unique_id'] == unique_id, 'account_balance'] = new_balance
        save_student_data(df, STUDENTS_FILE)
    return df

def add_item_to_bill(item_name, item_price, quantity):
    if quantity > 0:
        if item_name in st.session_state.items_purchased:
            st.session_state.items_purchased[item_name]['quantity'] += quantity
        else:
            st.session_state.items_purchased[item_name] = {'price': item_price, 'quantity': quantity}
        st.toast(f"Added {quantity} x {item_name} to bill!")

def display_menu_item(name, price):
    with st.container(border=True):
        st.markdown(f"**{name}**")
        st.markdown(f"Price: ₹{price:.2f}")
        quantity = st.number_input("Quantity", min_value=1, value=1, step=1, key=f"qty_{name.replace(' ', '_')}")
        if st.button("Add to Bill", key=f"add_{name.replace(' ', '_')}", use_container_width=True):
            add_item_to_bill(name, price, quantity)

def play_sound(file_path):
    try:
        with open(file_path, "rb") as f:
            data = f.read()
            b64 = base64.b64encode(data).decode()
            md = f"""
                <audio autoplay="true">
                <source src="data:audio/mpeg;base64,{b64}" type="audio/mpeg">
                </audio>
                """
            st.markdown(md, unsafe_allow_html=True)
    except FileNotFoundError:
        print(f"Warning: Sound file not found at {file_path}")


# --- UI Layout and Logic ---

def main():
    st.set_page_config(layout="wide")
    st.title("NFC Payment System")

    student_df = load_student_data(STUDENTS_FILE)
    menu_df = load_menu_data(MENU_FILE)
    if student_df is None or menu_df is None:
        return

    if 'account' not in st.session_state:
        st.session_state.account = None
    if 'items_purchased' not in st.session_state:
        st.session_state.items_purchased = {}

    with st.sidebar:
        st.header("Scan Card")
        if st.button("Scan for Card"):
            try:
                with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=2) as ser:
                    st.info("Waiting for NFC card...")
                    time.sleep(2)
                    if ser.in_waiting > 0:
                        uid_str = ser.readline().decode('utf-8').strip()
                        if uid_str.isdigit():
                            account = find_account_by_unique_id(student_df, int(uid_str))
                            if account:
                                st.session_state.account = account
                                st.session_state.items_purchased = {}
                                st.success(f"Card scanned for {account['name']}.")
                                st.rerun()
                            else: st.warning("Account not found.")
                        else: st.warning("Invalid data received.")
                    else: st.warning("No card detected.")
            except serial.SerialException as e: st.error(f"Error with serial port '{SERIAL_PORT}': {e}")
            except Exception as e: st.error(f"An unexpected error occurred: {e}")

        st.markdown("---")
        manual_id = st.text_input("Or Enter Unique ID Manually:")
        if st.button("Find Account"):
            if manual_id.isdigit():
                account = find_account_by_unique_id(student_df, int(manual_id))
                if account:
                    st.session_state.account = account
                    st.session_state.items_purchased = {}
                    st.rerun()
                else: st.warning("No account found for this ID.")
            else: st.warning("Please enter a valid numeric ID.")

        st.markdown("---")
        if st.session_state.account:
            st.header("Account Details")
            st.write(f"**Name:** {st.session_state.account['name']}")
            st.write(f"**Balance:** ₹{st.session_state.account['account_balance']:.2f}")
            st.header("Recharge Account")
            recharge_amount = st.number_input("Amount:", min_value=0.0, step=10.0, format="%.2f")
            if st.button("Recharge"):
                if recharge_amount > 0:
                    st.session_state.account['account_balance'] += recharge_amount
                    student_df = update_account_balance(student_df, st.session_state.account['unique_id'], st.session_state.account['account_balance'])
                    st.success(f"Recharged ₹{recharge_amount:.2f}.")
                    play_sound(SUCCESS_SOUND_PATH)
                    time.sleep(1)
                    st.rerun()
        
        st.markdown("---")
        with st.expander("Admin: Manage Menu"):
            st.subheader("Add New Item")
            with st.form("new_item_form", clear_on_submit=True):
                new_name = st.text_input("Item Name")
                new_price = st.number_input("Item Price", min_value=0.0, format="%.2f")
                new_category = st.text_input("New or Existing Category")
                submitted = st.form_submit_button("Add Item")

                if submitted:
                    if new_name and new_price > 0 and new_category:
                        new_item_df = pd.DataFrame([{'name': new_name, 'price': new_price, 'category': new_category.strip().title()}])
                        menu_df = pd.concat([menu_df, new_item_df], ignore_index=True)
                        save_menu_data(menu_df, MENU_FILE)
                        st.success(f"Added '{new_name}' to the menu.")
                        st.cache_data.clear()
                        st.rerun()
                    else:
                        st.warning("Please fill out all fields.")
            
            st.subheader("Remove Existing Item")
            if not menu_df.empty:
                item_to_remove = st.selectbox("Select Item to Remove", options=menu_df['name'])
                if st.button("Remove Item", type="primary"):
                    menu_df = menu_df[menu_df['name'] != item_to_remove]
                    save_menu_data(menu_df, MENU_FILE)
                    st.success(f"Removed '{item_to_remove}' from the menu.")
                    st.cache_data.clear()
                    st.rerun()

    if st.session_state.account:
        col1, col2 = st.columns([2, 2])
        with col1:
            st.header("Menu")
            categories = menu_df['category'].unique()
            for category in categories:
                st.subheader(category)
                items_in_category = menu_df[menu_df['category'] == category]
                
                for i in range(0, len(items_in_category), 2):
                    row_cols = st.columns(2)
                    item1 = items_in_category.iloc[i]
                    with row_cols[0]:
                        display_menu_item(item1['name'], item1['price'])
                    if i + 1 < len(items_in_category):
                        item2 = items_in_category.iloc[i + 1]
                        with row_cols[1]:
                            display_menu_item(item2['name'], item2['price'])

        with col2:
            st.header("Current Bill")
            if st.session_state.items_purchased:
                total_cost = 0.0
                header_cols = st.columns([3, 1, 2, 1])
                header_cols[0].write("**Item**"); header_cols[1].write("**Qty**"); header_cols[2].write("**Subtotal**"); header_cols[3].write("**Action**")

                for item_name, details in list(st.session_state.items_purchased.items()):
                    subtotal = details['price'] * details['quantity']
                    total_cost += subtotal
                    item_cols = st.columns([3, 1, 2, 1])
                    item_cols[0].write(f"{item_name}"); item_cols[1].write(f"{details['quantity']}"); item_cols[2].write(f"₹{subtotal:.2f}")
                    if item_cols[3].button("🗑️", key=f"remove_{item_name.replace(' ', '_')}"):
                        if st.session_state.items_purchased[item_name]['quantity'] > 1: st.session_state.items_purchased[item_name]['quantity'] -= 1
                        else: del st.session_state.items_purchased[item_name]
                        st.rerun()

                st.markdown("---"); st.subheader(f"Total Cost: ₹{total_cost:.2f}")
                
                if st.button("Finalize Purchase", use_container_width=True, type="primary"):
                    if st.session_state.account['account_balance'] >= total_cost:
                        st.session_state.account['account_balance'] -= total_cost
                        student_df = update_account_balance(student_df, st.session_state.account['unique_id'], st.session_state.account['account_balance'])
                        st.success(f"Purchase successful! New balance: ₹{st.session_state.account['account_balance']:.2f}")
                        play_sound(SUCCESS_SOUND_PATH)
                        st.balloons(); st.session_state.items_purchased = {}; time.sleep(2); st.rerun()
                    else:
                        st.error("Insufficient balance to complete the purchase.")
                        play_sound(ERROR_SOUND_PATH)
            else: st.info("Select items from the menu to add them to the bill.")
    else:
        st.info("Please scan an NFC card or enter a Unique ID to begin.")

if __name__ == '__main__':
    main()