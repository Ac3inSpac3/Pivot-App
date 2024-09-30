// Load Header Component
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        initializeHamburgerMenu(); // Initialize hamburger menu
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
        document.body.insertAdjacentHTML('beforeend', data);
        initializeModal(); // Initialize modal after loading
    });

// Initialize hamburger menu functionality with touch support
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const loginModal = document.getElementById('auth-modal');

    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    function closeSidebarOnOutsideClick(event) {
        if (!event.target.closest('.navigation') && !event.target.closest('.hamburger') && !event.target.closest('#auth-modal')) {
            navMenu.classList.remove('show');
        }
    }

    window.addEventListener('click', closeSidebarOnOutsideClick);
    window.addEventListener('touchstart', closeSidebarOnOutsideClick); // Touch support for mobile
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
