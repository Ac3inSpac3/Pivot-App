// auth.js

// Import Firebase functionality
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpCZszY7HrKM1zjn9J0WbYmcrgSZeHud4",
    authDomain: "pivot-app-c1cc8.firebaseapp.com",
    projectId: "pivot-app-c1cc8",
    storageBucket: "pivot-app-c1cc8.appspot.com",
    messagingSenderId: "144681811590",
    appId: "1:144681811590:web:a826a6655e457f78325b07",
    measurementId: "G-VJ237R9H24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login functionality
document.getElementById('submit-login')?.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Login successful!');
            document.getElementById('login-modal').style.display = 'none'; // Close modal on successful login
            window.location.href = 'account.html';  // Redirect to account page
        })
        .catch((error) => {
            alert('Login failed: ' + error.message);
        });
});

// Registration functionality
document.getElementById('submit-register')?.addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Registration successful!');
            document.getElementById('login-modal').style.display = 'none'; // Close modal on successful registration
            window.location.href = 'account.html';  // Redirect to account page
        })
        .catch((error) => {
            alert('Registration failed: ' + error.message);
        });
});

// Logout functionality
document.getElementById('logout-button')?.addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('Logout successful!');
        window.location.href = 'index.html';  // Redirect to home after logout
    }).catch((error) => {
        alert('Logout failed: ' + error.message);
    });
});

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    
    if (user) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';

        // Handle additional user-specific actions (e.g., fetching user data from Firestore)
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
});
