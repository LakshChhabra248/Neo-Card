// --- Nayi, Dynamic utilities.js ---

let billItems = [];
let currentStudentId = null;

// --- DOM Elements ---
const fetchStudentButton = document.getElementById('fetch-student-button');
const studentIdInput = document.getElementById('student-id-input');
const studentDisplay = document.getElementById('student-display');
const studentNameDisplay = document.getElementById('student-name-display');
const studentBalanceDisplay = document.getElementById('student-balance-display');
const processPaymentButton = document.getElementById('process-payment-button');
const addToBillButtons = document.querySelectorAll('.add-to-bill');


// --- Event Listeners ---
fetchStudentButton.addEventListener('click', fetchStudentInfo);
processPaymentButton.addEventListener('click', processPayment);

addToBillButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price);
        addToBill(itemName, itemPrice);
    });
});


// --- Functions ---
async function fetchStudentInfo() {
    const studentId = studentIdInput.value.trim();
    if (!studentId) {
        alert('Please enter a student ID.');
        return;
    }

    try {
        const response = await fetch(`/get-student-info/?student_id=${studentId}`);
        const data = await response.json();

        if (data.status === 'success') {
            studentNameDisplay.textContent = `Student: ${data.name}`;
            studentBalanceDisplay.textContent = parseFloat(data.balance).toFixed(2);
            studentDisplay.style.display = 'block';
            currentStudentId = studentId;
            processPaymentButton.disabled = false; // Enable payment button
        } else {
            alert(data.message);
            resetStudentInfo();
        }
    } catch (error) {
        console.error('Error fetching student info:', error);
        alert('Could not connect to the server.');
    }
}

async function processPayment() {
    const totalAmount = parseFloat(document.getElementById('total-amount').textContent);

    if (!currentStudentId) {
        alert('No student selected. Please fetch student details first.');
        return;
    }
    if (billItems.length === 0) {
        alert('Bill is empty. Please add items first.');
        return;
    }

    const confirmation = confirm(`Process payment of ₹${totalAmount.toFixed(2)} for ${studentNameDisplay.textContent}?`);
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch('/process-transaction/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student_id: currentStudentId,
                total_amount: totalAmount,
                bill_items: billItems,
            }),
        });
        const data = await response.json();
        
        if (data.status === 'success') {
            alert(data.message);
            studentBalanceDisplay.textContent = parseFloat(data.new_balance).toFixed(2);
            resetBill();
        } else {
            alert(`Error: ${data.message}`);
        }

    } catch (error) {
        console.error('Error processing payment:', error);
        alert('Could not process the payment.');
    }
}


function addToBill(itemName, itemPrice) {
    const existingItem = billItems.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        billItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateBill();
}

function updateBill() {
    const billItemsContainer = document.getElementById('bill-items');
    let total = 0;
    billItemsContainer.innerHTML = '';

    billItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const billItemDiv = document.createElement('div');
        billItemDiv.classList.add('bill-item');

        // --- YAHAN PAR CHANGE HUA HAI ---
        // Humne ek 'decrease-item' button add kiya hai
        billItemDiv.innerHTML = `
            <span>
                <button class="decrease-button" data-name="${item.name}">-</button> 
                ${item.name} (x${item.quantity})
            </span>
            <span>₹${itemTotal.toFixed(2)}</span>
        `;
        billItemsContainer.appendChild(billItemDiv);
    });

    document.getElementById('total-amount').textContent = total.toFixed(2);

    // Naye 'decrease' buttons par event listeners lagao
    attachDecreaseListeners();
}


function resetBill() {
    billItems = [];
    updateBill();
}

function resetStudentInfo() {
    studentDisplay.style.display = 'none';
    currentStudentId = null;
    processPaymentButton.disabled = true;
}

function attachDecreaseListeners() {
    const decreaseButtons = document.querySelectorAll('.decrease-button');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.dataset.name;
            decreaseQuantity(itemName);
        });
    });
}

function decreaseQuantity(itemName) {
    const itemIndex = billItems.findIndex(item => item.name === itemName);

    if (itemIndex > -1) { // Agar item milta hai
        billItems[itemIndex].quantity--; // Uski quantity kam kar do

        if (billItems[itemIndex].quantity <= 0) {
            // Agar quantity 0 ya usse kam ho gayi, to item ko bill se hata do
            billItems.splice(itemIndex, 1);
        }
    }

    // Bill ko dobara update karo taaki changes dikhein
    updateBill();
}

// Initialize
resetBill();
resetStudentInfo();