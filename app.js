// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registered successfully:', registration);
    })
    .catch(error => {
      console.log('Service Worker registration failed:', error);
    });
}

// Detect online/offline status
window.addEventListener('online', () => {
  document.getElementById('status').textContent = 'Online';
  document.getElementById('status').style.color = 'green';
});

window.addEventListener('offline', () => {
  document.getElementById('status').textContent = 'Offline';
  document.getElementById('status').style.color = 'red';
});

// App logic with localStorage for offline data persistence
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(taskList.children).map(li => li.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', () => {
  if (taskInput.value.trim()) {
    const li = document.createElement('li');
    li.textContent = taskInput.value;
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = '';
  }
});

// Load tasks on page load
loadTasks();
