import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC0lz8kTjGVdLeDXpMBuaa6PqDSlgDDNMI",
  authDomain: "third---section.firebaseapp.com",
  projectId: "third---section",
  storageBucket: "third---section.firebasestorage.app",
  messagingSenderId: "186465380544",
  appId: "1:186465380544:web:11ffc993fdd40d80f22525"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase Initialized Successfully",app);

// ✅ Select Elements
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");
const logoutBtn = document.getElementById("logout-btn");  
const googleButton = document.getElementById("googleButton");  

// ✅ Show Error Messages
function showError(message) {
  console.error("⚠️ Error:", message);
}

// ✅ Toggle Login & Signup Forms
if (toggleForm) {
  toggleForm.addEventListener("click", () => {
    const isLogin = loginForm.style.display !== "none";
    loginForm.style.display = isLogin ? "none" : "block";
    signupForm.style.display = isLogin ? "block" : "none";
    formTitle.textContent = isLogin ? "Welcome To ShopSwift" : "Login Form";
    toggleForm.textContent = isLogin ? "Already have an account? Login" : "Don't have an account? Sign Up";
  });
}

//  Signup Function
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("✅ User Signed Up Successfully:", userCredential.user);
        showError("Signup successful! Please log in.");
        signupForm.reset();
      })
      .catch((error) => showError("❌ Signup Error: " + error.message));
  });
}
//  Login Function
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("✅ User Logged In Successfully");
        window.location.href = "products.html"; 
      })
      .catch((error) => showError("❌ Login Error: " + error.message));
  });
}

onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.href;
  if (user) {
    if (currentPage.includes("index.html") || currentPage.includes("login.html")) {
      window.location.href = "products.html"; 
    }
  } else {
    if (currentPage.includes("products.html") || currentPage.includes("favorites.html") || currentPage.includes("cart.html")) {
      window.location.href = "index.html"; 
    }
  }
});

// ✅ Logout Function
logoutBtn?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("✅ User Logged Out Successfully");
      window.location.href = "index.html"; 
    })
    .catch((error) => console.error("❌ Logout Failed: " + error.message));
});
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active"); // Toggle the menu visibility
  });
});
 
   