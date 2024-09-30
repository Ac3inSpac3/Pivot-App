// Import Firebase auth from auth.js
import { auth } from './auth.js';

// Register the service worker for offline support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch(error => console.error('Service Worker registration failed:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    // Function to load page content dynamically
    function loadPage(page) {
        fetch(`components/${page}.html`)
            .then(response => response.text())
            .then(data => {
                // Ensure the main-content div exists before inserting data
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.innerHTML = data;

                    // After loading the account page, insert dynamic data (email)
                    if (page === 'account') {
                        displayUserEmail(); // Call the function to inject email
                    }
                } else {
                    console.error("Main content area not found");
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Event listeners for navigation (you can customize this for your navigation links)
    document.getElementById('dashboard-link')?.addEventListener('click', () => loadPage('dashboard'));
    document.getElementById('account-link')?.addEventListener('click', () => loadPage('account'));
    document.getElementById('tasks-link')?.addEventListener('click', () => loadPage('tasks'));
    document.getElementById('home-link')?.addEventListener('click', () => loadPage('home'));

    // Check if the user is logged in using Firebase auth state
    function initializePage() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                loadPage('dashboard'); // Load the dashboard if user is logged in
            } else {
                //loadPage('login'); // Load the login page if user is not logged in
            }
        });
    }

    // Function to display user email dynamically using Firebase auth
    function displayUserEmail() {
        const user = auth.currentUser; // Get the current user from Firebase
        if (user && user.email) {
            document.getElementById('user-email').textContent = user.email;
        }
    }

    // Call the initializePage when the page loads
    initializePage();
});