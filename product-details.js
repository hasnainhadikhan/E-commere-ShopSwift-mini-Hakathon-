// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Fetch product details
const fetchProductDetails = async () => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();

        // Update HTML content dynamically
        document.getElementById("category").textContent = product.category;
        document.getElementById("title").textContent = product.title;
        document.getElementById("description").textContent = product.description;
        document.getElementById("price").textContent = `$${product.price}`;
        document.getElementById("product-image").src = product.thumbnail;

        // Handle Add to Favorites
        document.querySelector(".add-to-favorites").addEventListener("click", () => {
            addToFavorites(product);
        });

    } catch (error) {
        console.error("Error fetching product details:", error);
    }
};

// Add product to favorites
const addToFavorites = (product) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if product already exists in favorites
    let existingProduct = favorites.find(item => item.id === product.id);
    if (existingProduct) {
        alert("Product is already in favorites!");
        return;
    }

    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites!");
};

// Load product details when page loads
fetchProductDetails();
    

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});
