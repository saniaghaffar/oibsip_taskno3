document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'))

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task))
    updateTasksList();
    updateStats();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();

  if (task) {
    tasks.push({
      text: task,
      completed: false
    });
    taskInput.value = "";
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById('taskInput');
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completeTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completeTasks / totalTasks) * 100;
  const progressBar = document.getElementById('progress');

  progressBar.style.width = `${progress}%`;

  document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
}

const updateTasksList = (filteredTasks = tasks) => {
  const tasksList = document.getElementById('task-list');
  tasksList.innerHTML = '';
  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ""}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./images/edit-2.jpeg" onClick="editTask(${index})" />
          <img src="./images/bin2.png" onClick="deleteTask(${index})" />
        </div>
      </div>
    `;
    listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
    tasksList.appendChild(listItem);
  });
};

document.getElementById('showComplete').addEventListener('click', function () {
  const completeTasks = tasks.filter(task => task.completed);
  updateTasksList(completeTasks);
});

document.getElementById('showIncomplete').addEventListener('click', function () {
  const incompleteTasks = tasks.filter(task => !task.completed);
  updateTasksList(incompleteTasks);
});

document.getElementById('deleteAll').addEventListener('click', function () {
  tasks = [];
  updateTasksList();
  updateStats();
  saveTasks();
});

document.getElementById('newTask').addEventListener('click', function (e) {
  e.preventDefault();
  addTask();
});
