// Load Header Component
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        initializeHamburgerMenu(); // Initialize hamburger menu
    });

// Load Login Modal Component
fetch('components/login-modal.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('beforeend', data);
        initializeModal(); // Initialize modal after loading
    });

// Initialize hamburger menu functionality with touch support
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const loginModal = document.getElementById('auth-modal');

    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('show'); // Toggle the sidebar
    });

    function closeSidebarOnOutsideClick(event) {
        if (!event.target.closest('.navigation') && !event.target.closest('.hamburger') && !event.target.closest('#auth-modal')) {
            navMenu.classList.remove('show'); // Close the sidebar when clicking outside
        }
    }

    window.addEventListener('click', closeSidebarOnOutsideClick);
    window.addEventListener('touchstart', closeSidebarOnOutsideClick); // Touch support for mobile

    // Close the sidebar when clicking on any sidebar item (excluding the login button)
    const navLinks = document.querySelectorAll('.navigation a:not(#login-button)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show'); // Collapse sidebar
            navMenu.style.pointerEvents = 'auto'; // Ensure re-enabling
        });
    });
}

// Initialize modal functionality with touch support
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
        navMenu.style.pointerEvents = 'none';
    });

    // Close modal and re-enable sidebar
    closeModalButton?.addEventListener('click', () => {
        loginModal.style.display = 'none';
        navMenu.style.pointerEvents = 'auto';
    });

    // Close modal when clicking or tapping outside
    function closeModalOnOutsideClick(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            navMenu.style.pointerEvents = 'auto';
        }
    }

    window.addEventListener('click', closeModalOnOutsideClick);
    window.addEventListener('touchstart', closeModalOnOutsideClick); // Touch support for mobile

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