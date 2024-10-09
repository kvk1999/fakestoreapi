const API_URL = 'https://fakestoreapi.com/products';
const productListElement = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const deleteButton = document.getElementById('delete-button');
const addToCartButton = document.getElementById('add-to-cart-button');
const viewCartButton = document.getElementById('view-cart');

let products = [];
let currentProduct = null;
let cart = []; // To store cart items

async function fetchProducts() {
    const response = await fetch(API_URL);
    products = await response.json();
    displayProducts(products);
}

function displayProducts(products) {
    productListElement.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card', 'bg-white', 'rounded-lg', 'shadow-lg', 'p-4', 'cursor-pointer');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover rounded-md mb-2">
            <h3 class="text-lg font-semibold">${product.title}</h3>
            <p class="text-lg text-green-600">$${product.price}</p>
            <div class="flex justify-between mt-4">
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy Now</button>
            </div>
        `;
        card.onclick = () => openModal(product);
        productListElement.appendChild(card);
    });
}

function openModal(product) {
    currentProduct = product; // Store the current product for later use
    modal.classList.remove('hidden');
    modalTitle.innerText = product.title;
    modalImage.src = product.image;
    modalDescription.innerText = product.description;
    modalPrice.innerText = `Price: $${product.price}`;
}

function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);
    cart.push(productToAdd);
    alert(`${productToAdd.title} has been added to your cart!`);
}

deleteButton.onclick = () => {
    if (currentProduct) {
        const productIndex = products.findIndex(product => product.id === currentProduct.id);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            displayProducts(products);
            alert(`${currentProduct.title} has been deleted.`);
            closeModal();
        }
    }
}

function closeModal() {
    modal.classList.add('hidden');
    currentProduct = null; // Reset the current product
}

closeButton.onclick = closeModal;

window.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
}

searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

// View Cart Functionality
viewCartButton.onclick = () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        const cartDetails = cart.map(item => `${item.title}: $${item.price}`).join('\n');
        alert("Your Cart:\n" + cartDetails);
    }
}

// Initial fetch
fetchProducts();

