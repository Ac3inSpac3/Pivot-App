// components.js

// Load Header Component
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        initializeModal(); // Ensure modal is initialized after loading header
    });

// Load Footer Component
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

// Initialize modal functionality
function initializeModal() {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeModalButton = document.getElementById('close-modal');

    // Show modal on login button click
    loginButton?.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    // Close modal on close button click
    closeModalButton?.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
}
