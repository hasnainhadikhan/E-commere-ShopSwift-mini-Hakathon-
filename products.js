// Fetch products from DummyJSON API
const fetchProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const products = data.products;

        const productContainer = document.getElementById('product-container');

        // Loop through products and create product cards
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id; // Store product ID for navigation

            productCard.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}" class="product-image" data-id="${product.id}">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 80)}...</p>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add To Cart</button>
                <button class="add-to-favorites" data-id="${product.id}">❤️</button>
            `;

            productContainer.appendChild(productCard);

            // ✅ Click event to open product details when clicking anywhere on the card
            productCard.addEventListener("click", (e) => {
                // Prevent event if clicking "Add to Cart" or "Favorites"
                if (!e.target.classList.contains("add-to-cart") && !e.target.classList.contains("add-to-favorites")) {
                    window.location.href = `productDetail.html?id=${product.id}`;
                }
            });
        });

        // ✅ Add to Cart Button
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent card click event
                const productId = e.target.dataset.id;
                addToCart(productId);
            });
        });

        // ✅ Add to Favorites Button
        document.querySelectorAll('.add-to-favorites').forEach(button => {
            button.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent card click event
                const productId = e.target.dataset.id;
                addToFavorites(productId);
            });
        });

    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// ✅ Add to Cart Function
const addToCart = async (productId) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if product exists in cart
        let existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert("✅ Product added to cart!");

    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

// ✅ Add to Favorites Function
const addToFavorites = async (productId) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Prevent duplicates
        if (!favorites.some(item => item.id === product.id)) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert("❤️ Added to Favorites!");
        } else {
            alert("✅ Already in Favorites!");
        }
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
};

// ✅ Update Cart Count
const updateCartCount = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById("cart-count").textContent = cart.length;
};

// ✅ Load products when page loads
window.onload = () => {
    fetchProducts();
    updateCartCount();
};

 
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active"); // Toggle the menu visibility
    });
});
