// JavaScript Functionality
let billItems = [];

function addToBill(itemName, itemPrice) {
    const existingItem = billItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * itemPrice;
    } else {
        billItems.push({
            name: itemName,
            quantity: 1,
            price: itemPrice,
            totalPrice: itemPrice
        });
    }

    updateBill();
}

function updateBill() {
    const billItemsContainer = document.getElementById('bill-items');
    const totalAmountSpan = document.getElementById('total-amount');
    let total = 0;

    billItemsContainer.innerHTML = ''; // Clear existing bill items

    billItems.forEach(item => {
        const billItemDiv = document.createElement('div');
        billItemDiv.classList.add('bill-item');
        billItemDiv.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>₹${item.price.toFixed(2)} x ${item.quantity} = ₹${item.totalPrice.toFixed(2)}</span>
        `;
        billItemsContainer.appendChild(billItemDiv);
        total += item.totalPrice;
    });

    totalAmountSpan.textContent = total.toFixed(2);
}

function resetBill() {
    billItems = [];
    updateBill();
}

// Event Listeners for Add to Bill Buttons
const addToBillButtons = document.querySelectorAll('.add-to-bill');
addToBillButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price);
        addToBill(itemName, itemPrice);
    });
});