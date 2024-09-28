const API_URL = 'https://fakestoreapi.com/products';
const productListElement = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalQuantity = document.getElementById('quantity');

let products = [];

// Fetch products from the Fake Store API
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products in card format
function displayProducts(products) {
    productListElement.innerHTML = ''; // Clear the product list
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card', 'bg-white', 'rounded-lg', 'shadow-lg', 'p-4', 'cursor-pointer');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover rounded-md mb-2">
            <h3 class="text-lg font-semibold">${product.title}</h3>
            <p class="text-lg text-green-600">$${product.price}</p>
        `;
        card.onclick = () => openModal(product);
        productListElement.appendChild(card);
    });
}

// Open modal with product details
function openModal(product) {
    modal.classList.remove('hidden');
    modalTitle.innerText = product.title;
    modalImage.src = product.image;
    modalDescription.innerText = product.description;
    modalPrice.innerText = `Price: $${product.price}`;
    modalQuantity.value = 1; // Set default quantity to 1
}

// Close modal
closeButton.onclick = () => {
    modal.classList.add('hidden');
}

// Close modal when clicking outside of the modal content
window.onclick = (event) => {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
}

// Search functionality
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

// Fetch and display products on page load
fetchProducts();
