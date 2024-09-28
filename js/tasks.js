// tasks.js - Task Management Logic for Pivot App

// Array to store tasks
let tasks = [];

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

// Function to add a subtask
function addSubtask(parentTaskId, subtaskName) {
    const parentTask = tasks.find(task => task.id === parentTaskId);
    if (parentTask) {
        parentTask.subtasks.push({
            id: Date.now(),
            name: subtaskName,
            completed: false
        });
        renderTasks();
    }
}

// Function to set a task as blocking
function setTaskBlocking(taskId, isBlocking) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.blocking = isBlocking;
        renderTasks();
    }
}

// Event listeners and other task-related logic can be added here
