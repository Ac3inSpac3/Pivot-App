// Register the service worker for offline support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch(error => console.error('Service Worker registration failed:', error));
}

// Task management logic
let tasks = [];

// Function to add a new task
function addTask(taskName) {
    const task = {
        id: Date.now(),
        name: taskName,
        subtasks: [],
        blocking: false
    };
    tasks.push(task);
    renderTasks();
}

// Function to render tasks to the DOM
function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.textContent = task.name;
        tasksList.appendChild(taskItem);
    });
}

// Event listener for adding tasks
document.getElementById('add-task-button').addEventListener('click', () => {
    const taskNameInput = document.getElementById('task-name');
    if (taskNameInput.value.trim()) {
        addTask(taskNameInput.value.trim());
        taskNameInput.value = '';
    }
});
