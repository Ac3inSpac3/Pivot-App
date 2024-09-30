// components.js

// Load Header Component
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Initialize the hamburger menu functionality after header is loaded
        initializeHamburgerMenu();
    });

// Load Footer Component
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

// Load Login Modal Component
fetch('components/login-modal.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('beforeend', data); // Insert modal at the end of the body
        // Initialize modal functionality after it is loaded
        const closeModalButton = document.getElementById('close-modal');
        const loginModal = document.getElementById('auth-modal');

        closeModalButton?.addEventListener('click', () => {
            console.log('Close button clicked');  // Check if this logs
            loginModal.style.display = 'none';
        });

        // Initialize modal functionality after it is loaded
        initializeModal();
    });

// Initialize hamburger menu functionality
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const loginModal = document.getElementById('auth-modal');

    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('show'); // Toggle the "show" class to slide the menu
    });

    window.addEventListener('click', (event) => {
        // Only close the sidebar if click is outside navigation, hamburger, and modal
        if (!event.target.closest('.navigation') && !event.target.closest('.hamburger') && !event.target.closest('#auth-modal')) {
            navMenu.classList.remove('show'); // Close the menu if clicked outside
        }
    });
}

// Initialize modal functionality
function initializeModal() {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('auth-modal');
    const closeModalButton = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const navMenu = document.getElementById('nav-menu');

    // Show modal and disable sidebar
    loginButton?.addEventListener('click', () => {
        loginModal.style.display = 'flex';
        navMenu.style.pointerEvents = 'none';  // Disable sidebar
    });

    // Close modal and re-enable sidebar
    closeModalButton?.addEventListener('click', () => {
        loginModal.style.display = 'none';
        navMenu.style.pointerEvents = 'auto';  // Re-enable sidebar
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            navMenu.style.pointerEvents = 'auto';  // Re-enable sidebar
        }
    });

    // Toggle to registration form
    showRegisterLink.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    // Toggle to login form
    showLoginLink.addEventListener('click', () => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });



}
