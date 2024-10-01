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

                    // Initialize task page if loaded
                    if (page === 'tasks') {
                        initializeTaskPage();
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

    function initializeTaskPage() {
        const taskModal = document.getElementById('task-modal');
        const addTaskButton = document.getElementById('add-task-button');
        const closeModalButton = document.getElementById('close-task-modal');
        const submitTaskButton = document.getElementById('submit-task');
        const taskList = document.getElementById('task-list');
    
        // Show the modal when the "Add Task" button is clicked
        addTaskButton.addEventListener('click', () => {
            taskModal.style.display = 'flex';
        });
    
        // Close the modal when the close button is clicked
        closeModalButton.addEventListener('click', () => {
            taskModal.style.display = 'none';
        });
    
        // Submit a new task when "Submit" button is clicked
        submitTaskButton.addEventListener('click', async () => {
            const title = document.getElementById('task-title').value;
            const details = document.getElementById('task-details').value;
    
            if (title && details) {
                const user = auth.currentUser;
                if (user) {
                    try {
                        await addDoc(collection(db, 'users', user.uid, 'tasks'), {
                            title: title,
                            details: details,
                            createdAt: new Date(),
                        });
                        alert('Task added successfully!');
                        taskModal.style.display = 'none';  // Close the modal after adding task
                        loadTasks();  // Refresh the task list
                    } catch (error) {
                        console.error('Error adding task:', error);
                    }
                }
            } else {
                alert('Please enter a title and details for the task.');
            }
        });
    
        async function loadTasks() {
            const user = auth.currentUser;
            if (user) {
                taskList.innerHTML = '';  // Clear current task list
                const tasksCollection = collection(db, 'users', user.uid, 'tasks');
                const q = query(tasksCollection, orderBy('createdAt', 'asc'));
                const querySnapshot = await getDocs(q);
        
                let taskCount = 0;  // Initialize task count
        
                querySnapshot.forEach((doc) => {
                    const task = doc.data();
                    taskList.innerHTML += `<div class="task-list-item">
                        <div>
                            <h3>${task.title}</h3>
                            <p>${task.details}</p>
                        </div>
                    </div>`;
                    taskCount++;  // Increment task count for each task
                });
        
                // Update the task count in the UI
                document.getElementById('task-count').textContent = taskCount;
            }
        }
        
        loadTasks();  // Load tasks when the page is initialized
    }
    

    initializePage();
});
