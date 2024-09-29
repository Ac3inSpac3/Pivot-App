// tasks.js - Task Management Logic for Pivot App

// Array to store tasks
let tasks = [];

console.log("tasks loaded");

// Function to add a new task
function addTask(taskName) {
    const task = {
        id: Date.now(),
        name: taskName,
        subtasks: [],
        blocking: false,
        dueDate: null
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