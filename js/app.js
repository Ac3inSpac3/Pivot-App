// app.js

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch(error => console.error('Service Worker registration failed:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    function loadPage(page) {
        fetch(`components/${page}.html`)
            .then(response => response.text())
            .then(data => {
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.innerHTML = data;

                    // If account page is loaded, display user email
                    if (page === 'account') {
                        displayUserEmail();
                    }
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    document.getElementById('dashboard-link')?.addEventListener('click', () => loadPage('dashboard'));
    document.getElementById('account-link')?.addEventListener('click', () => loadPage('account'));
    document.getElementById('tasks-link')?.addEventListener('click', () => loadPage('tasks'));
    document.getElementById('home-link')?.addEventListener('click', () => loadPage('home'));

    function initializePage() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                loadPage('account');
            } else {
                loadPage('home');
            }
        });
    }

    function displayUserEmail() {
        const user = auth.currentUser;
        if (user && user.email) {
            document.getElementById('user-email').textContent = user.email;
        }
    }

    initializePage();
});
