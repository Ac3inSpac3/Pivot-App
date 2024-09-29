// auth.js - User Authentication Logic for Pivot App

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

// Modal elements
const authModal = document.getElementById('auth-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const closeAuthButton = document.getElementById('close-auth');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');


// Open the login modal when login button is clicked
loginButton.addEventListener('click', () => {
    authModal.style.display = 'block';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

// Close the auth modal when the close button is clicked
closeAuthButton.addEventListener('click', () => {
    authModal.style.display = 'none';
});

// Toggle between login and register forms
document.getElementById('show-register').addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

// Handle user login
document.getElementById('submit-login').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginUser(email, password);
});

// Handle user registration
document.getElementById('submit-register').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    registerUser(email, password);
});

// Function to handle user login
function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user.email);
            alert('Login successful!');
            authModal.style.display = 'none';
            window.location.href = 'account.html';  // Redirect to account page
        })
        .catch((error) => {
            console.error('Login error:', error.message);
            alert('Login failed: ' + error.message);
        });
}

// Function to handle user registration
function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User registered:', userCredential.user.email);
            alert('Registration successful!');
            // Automatically log in after registration
            authModal.style.display = 'none';
            window.location.href = 'account.html';  // Redirect to account page
        })
        .catch((error) => {
            console.error('Registration error:', error.message);
            alert('Registration failed: ' + error.message);
        });
}

// Handle user logout
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('User logged out');
        alert('Logout successful!');
        window.location.href = 'index.html';  // Redirect to home page after logout
    }).catch((error) => {
        console.error('Logout error:', error.message);
        alert('Logout failed: ' + error.message);
    });
});

// Monitor user authentication state and display user info
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is logged in
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';

        if (window.location.pathname === '/pages/account.html') {
            // Display user information on the account page
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                document.getElementById('user-email').value = user.email;
                document.getElementById('user-name').value = userData.name || '';
                document.getElementById('user-bio').value = userData.bio || '';
            } else {
                console.log('No user data found!');
            }

            // Handle saving user info
            document.getElementById('save-info').addEventListener('click', async () => {
                await setDoc(userDocRef, {
                    name: document.getElementById('user-name').value,
                    bio: document.getElementById('user-bio').value
                }, { merge: true });
                alert('User info saved!');
            });
        }
    } else {
        // User is logged out
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';

        if (window.location.pathname === '/account.html') {
            window.location.href = 'index.html';  // Redirect to home if not logged in
        }
    }
});