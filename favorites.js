document.addEventListener("DOMContentLoaded", function () {
    const favoritesContainer = document.getElementById("favorites-container");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>💔 No favorite products added yet.</p>";
    } else {
        favorites.forEach((item, index) => {
            favoritesContainer.innerHTML += `
                <div class="favorite-item">
                    <img src="${item.thumbnail}" width="100">
                    <p>${item.title} </p>
                    <h3>$${item.price}</h3>
                 
                    <button onclick="removeFromFavorites(${index})" class="remove-favorite"> Remove</button>
                </div>
            `;
        });
    }
});

// ✅ Remove Item from Favorites
function removeFromFavorites(index) {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active"); // Toggle the menu visibility
    });
});