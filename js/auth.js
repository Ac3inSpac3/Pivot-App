// auth.js
import { loadPage } from './app.js';

// Import Firebase functionality
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Export the auth object so it can be used in other files
export { auth, db };

// Ensure DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // Login functionality
    document.getElementById('submit-login-modal')?.addEventListener('click', () => {
        const email = document.getElementById('login-email-modal').value;
        const password = document.getElementById('login-password-modal').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                document.getElementById('auth-modal').style.display = 'none'; // Close modal on successful login
                loadPage('account')
            })
            .catch((error) => {
                alert('Login failed: ' + error.message);
            });
    });

    // Registration functionality
    document.getElementById('submit-register-modal')?.addEventListener('click', () => {
        const email = document.getElementById('register-email-modal').value;
        const password = document.getElementById('register-password-modal').value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                document.getElementById('auth-modal').style.display = 'none'; // Close modal on successful registration
                loadPage('account')
            })
            .catch((error) => {
                alert('Registration failed: ' + error.message);
            });
    });

    // Logout functionality
    document.getElementById('logout-button')?.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert('Logout successful!');
            loadPage('home')
        }).catch((error) => {
            alert('Logout failed: ' + error.message);
        });
    });

    // Check authentication state and update UI
    onAuthStateChanged(auth, (user) => {
        const loginButton = document.getElementById('login-button');
        const logoutButton = document.getElementById('logout-button');
        
        if (user) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'block';
    
            // Check if we are on the account page and display user info
            if (window.location.pathname.includes('account.html')) {
                document.getElementById('welcome-message').textContent = `Welcome, ${user.email}`;
            }
        } else {
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
        }
    });
});

