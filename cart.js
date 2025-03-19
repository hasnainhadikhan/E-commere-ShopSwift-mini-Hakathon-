const loadCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <button class="remove-item" data-id="${product.id}">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
};

// Remove product from cart
const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== parseInt(productId));
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
};

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    loadCart();
});

// Load cart when page loads
window.onload = loadCart;
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
  
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  });
  