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
        const deleteTaskButton = document.getElementById('delete-task'); // New delete button
        const taskList = document.getElementById('task-list');
        let editingTaskId = null;
    
        // Open modal for adding a new task
        addTaskButton?.addEventListener('click', () => {
            taskModal.style.display = 'flex';
            clearTaskModal();
            document.getElementById('task-modal-title').textContent = 'Add New Task';
            editingTaskId = null;  // Reset editing task ID
            deleteTaskButton.style.display = 'none';  // Hide delete button when adding new task
        });

        const taskDetailsTextarea = document.getElementById('task-details');
        taskDetailsTextarea.addEventListener('input', autoResize);

        function autoResize() {
            this.style.height = 'auto';
            this.style.height = `${this.scrollHeight}px`;
        }
    
        // Close the modal when the close button is clicked
        closeModalButton?.addEventListener('click', () => {
            taskModal.style.display = 'none';
        });
    
        // Submit a new or edited task
        submitTaskButton?.addEventListener('click', async () => {
            const title = document.getElementById('task-title').value;
            const details = document.getElementById('task-details').value;
            const dueDate = document.getElementById('task-due-date').value;
            const priority = document.getElementById('task-priority').value;
    
            if (title && details) {
                const user = auth.currentUser;
                if (user) {
                    try {
                        if (editingTaskId) {
                            // Update task if editing
                            await updateDoc(doc(db, 'users', user.uid, 'tasks', editingTaskId), {
                                title, details, dueDate, priority
                            });
                        } else {
                            // Add a new task
                            await addDoc(collection(db, 'users', user.uid, 'tasks'), {
                                title, details, dueDate, priority, createdAt: new Date()
                            });
                        }
                        taskModal.style.display = 'none';  // Close modal
                        loadTasks();  // Refresh task list
                    } catch (error) {
                        console.error('Error adding/updating task:', error);
                    }
                }
            } else {
                alert('Please enter a title and details for the task.');
            }
        });
    
        // Load tasks dynamically
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
                    const taskItem = document.createElement('div');
                    taskItem.className = 'task-list-item';
                    taskItem.innerHTML = `
                        <h3>${task.title}</h3>
                        <p>${task.details}</p>
                        <p>Due Date: ${task.dueDate || 'Not set'}</p>
                        <p>Priority: ${task.priority || 'Low'}</p>
                    `;
    
                    taskItem.addEventListener('click', () => {
                        // Load task details into the modal for editing
                        document.getElementById('task-title').value = task.title;
                        document.getElementById('task-details').value = task.details;
                        document.getElementById('task-due-date').value = task.dueDate || '';
                        document.getElementById('task-priority').value = task.priority || 'low';
                        editingTaskId = doc.id;  // Set task ID for editing
                        taskModal.style.display = 'flex';
                        document.getElementById('task-modal-title').textContent = 'Edit Task';
                        deleteTaskButton.style.display = 'block';  // Show delete button when editing
                    });
    
                    taskList.appendChild(taskItem);
                    taskCount++;  // Increment task count
                });
    
                // Update task count
                document.getElementById('task-count').textContent = taskCount;
            }
        }
    
        // Delete task functionality
        deleteTaskButton?.addEventListener('click', async () => {
            if (editingTaskId) {
                const user = auth.currentUser;
                if (user) {
                    try {
                        await deleteDoc(doc(db, 'users', user.uid, 'tasks', editingTaskId));
                        alert('Task deleted successfully!');
                        taskModal.style.display = 'none';  // Close modal
                        loadTasks();  // Refresh task list
                    } catch (error) {
                        console.error('Error deleting task:', error);
                    }
                }
            }
        });
    
        // Clear modal fields
        function clearTaskModal() {
            document.getElementById('task-title').value = '';
            document.getElementById('task-details').value = '';
            document.getElementById('task-due-date').value = '';
            document.getElementById('task-priority').value = 'low';
        }
    
        loadTasks();  // Load tasks when the page is initialized
    }

    initializePage();
});