// auth.js

// Import Firebase functionality
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Expose Firebase services globally
window.auth = auth;
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.query = query;
window.where = where;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;
window.orderBy = orderBy;

// Event listeners for login and register
document.addEventListener('DOMContentLoaded', () => {
    // Login modal submit button and Enter key handler
    document.getElementById('submit-login-modal')?.addEventListener('click', handleLogin);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && document.getElementById('login-form').style.display === 'block' && document.getElementById('task-modal') === null) {
            handleLogin();
            console.log("loging in user")
        }
    });
    function handleLogin() {
        const email = document.getElementById('login-email-modal').value;
        const password = document.getElementById('login-password-modal').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                document.getElementById('auth-modal').style.display = 'none'; // Close modal
                window.location.href = '#dashboard'; // Load dashboard
            })
            .catch((error) => {
                alert('Login failed: ' + error.message);
            });
    }

    // Register modal submit button and Enter key handler
    document.getElementById('submit-register-modal')?.addEventListener('click', handleRegister);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && document.getElementById('register-form').style.display === 'block' && document.getElementById('task-modal') === null) {
            handleRegister();
            console.log("registering user")
        }
    });
    function handleRegister() {
        const email = document.getElementById('register-email-modal').value;
        const password = document.getElementById('register-password-modal').value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                document.getElementById('auth-modal').style.display = 'none'; // Close modal
                window.location.href = '#dashboard'; // Load dashboard
            })
            .catch((error) => {
                alert('Registration failed: ' + error.message);
            });
    }

    // Logout functionality
    document.getElementById('logout-button')?.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                alert('Logout successful!');
                window.location.href = '#home'; // Redirect to home
            })
            .catch((error) => {
                alert('Logout failed: ' + error.message);
            });
    });

    onAuthStateChanged(auth, (user) => {
        const loginButton = document.getElementById('login-button');
        const accountButton = document.getElementById('account-link');
        const dashboardButton = document.getElementById('dashboard-link');
        const logoutButton = document.getElementById('logout-button');
        const tasksButton = document.getElementById('tasks-link');
        const navMenu = document.getElementById('nav-menu'); // Sidebar
    
        if (user) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'block';
            accountButton.style.display = 'block';
            dashboardButton.style.display = 'block';
            tasksButton.style.display = 'block';

            // Collapse the sidebar and re-enable it after login
            navMenu.classList.remove('show');
            navMenu.style.pointerEvents = 'auto';
    
            // Display user's email on the account page if logged in
            if (window.location.pathname.includes('account.html')) {
                document.getElementById('welcome-message').textContent = `Welcome, ${user.email}`;
                
            }
        } else {
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
            accountButton.style.display = 'none';
            dashboardButton.style.display = 'none';
            tasksButton.style.display = 'none';
        }
    });
    
});
