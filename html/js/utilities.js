// JavaScript Functionality
let billItems = [];
const apiKey = "YOUR_API_KEY"; // Replace with your actual API key - *NOT RECOMMENDED FOR PRODUCTION*

// Function to set the image URL to the item element
function setItemImageUrl(itemElement, imageUrl) {
    itemElement.dataset.imageUrl = imageUrl;
    const imgElement = itemElement.querySelector('.item-ai-image');
    if (imgElement) {
        imgElement.src = imageUrl;
    }
}

function addToBill(itemName, itemPrice) {
    const existingItem = billItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * itemPrice;
    } else {
        const newItem = {
            name: itemName,
            quantity: 1,
            price: itemPrice,
            totalPrice: itemPrice
        };
        billItems.push(newItem);
    }

    updateBill();
}

function decreaseQuantity(itemName) {
    const existingItem = billItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity--;

        if (existingItem.quantity <= 0) {
            // Remove the item if quantity reaches zero
            billItems = billItems.filter(item => item.name !== itemName);
        } else {
            existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }

        updateBill();
    }
}

async function fetchItemImage(itemElement, itemName) { // Pass the itemName as argument
    const apiUrl = `https://api.example.com/generate_image?prompt=${itemName}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET', // Or POST, depending on the API
            headers: {
                'Authorization': `Bearer ${apiKey}`  // Add API key to header
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // Assuming the API returns JSON

        // Assuming the API response contains an image URL
        const imageUrl = data.imageUrl;

        setItemImageUrl(itemElement, imageUrl);
    } catch (error) {
        console.error("Error fetching image:", error);
        // Handle the error (e.g., display a placeholder image)
        setItemImageUrl(itemElement, "placeholder.png"); // Use a default image
    }
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
            <button class="decrease-item" data-name="${item.name}">-</button>
        `;
        billItemsContainer.appendChild(billItemDiv);
        total += item.totalPrice;
    });

    totalAmountSpan.textContent = total.toFixed(2);

    // Add event listeners to the decrease buttons *after* they are added to the DOM
    const decreaseButtons = document.querySelectorAll('.decrease-item');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.dataset.name;
            decreaseQuantity(itemName);
        });
    });
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

document.addEventListener('DOMContentLoaded', function() {
    const itemElements = document.querySelectorAll('.item');
    itemElements.forEach(itemElement => {
        const itemName = itemElement.querySelector('h4').textContent.replace('Snack - ', '').trim(); // Extract item name
        fetchItemImage(itemElement, itemName); // Fetch and set image
    });
});