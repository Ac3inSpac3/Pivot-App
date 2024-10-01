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
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    // Load the 404 page if the requested page is not found
                    return fetch('components/404.html').then(res => res.text());
                }
            })
            .then(data => {
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.innerHTML = data;

                    // If account page is loaded, display user email
                    if (page === 'account') {
                        displayUserEmail();
                    }
                    
                    // If 404 page is loaded, set up the return home button
                    if (page === '404') {
                        document.getElementById('return-home')?.addEventListener('click', () => {
                            loadPage('home');
                        });
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
