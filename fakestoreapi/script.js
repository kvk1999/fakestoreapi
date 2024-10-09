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
const checkoutButton = document.getElementById('checkout-button');

let products = [];
let currentProduct = null;

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
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add to Cart</button>
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

closeButton.onclick = () => {
    modal.classList.add('hidden');
}

window.onclick = (event) => {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
}

searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

// Handle button actions
deleteButton.onclick = (event) => {
    event.stopPropagation(); // Prevent modal close
    alert(`Product "${currentProduct.title}" deleted!`); // Placeholder for delete functionality
};

checkoutButton.onclick = (event) => {
    event.stopPropagation(); // Prevent modal close
    alert('Proceeding to checkout!'); // Placeholder for checkout functionality
};

// Initial fetch
fetchProducts();
