const form = document.querySelector("form#task-form");
const taskList = document.querySelector("ul.collection");
const clearBtn = document.querySelector("a.clear-tasks");
const filter = document.querySelector("input#filter");
const taskInput = document.querySelector("#task");

// Lord all event listner
loadEventListeners();

// Lord all event listener
function loadEventListeners() {
  // DOM lord Event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task Event
  form.addEventListener("submit", addTask);
  // Remove task Event
  taskList.addEventListener("click", removeTask);
  // Clear tasks Event
  clearBtn.addEventListener("click", clearTasks);
  // Filter Tasks Event
  filter.addEventListener("keyup", filterTasks);
}
// Get Tasks from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Create a List Item
    const li = document.createElement("li");

    // Add a Calss
    li.classList = "collection-item";

    // Create a text node and append to the li
    li.appendChild(document.createTextNode(task));

    // Create a new link
    const link = document.createElement("a");

    // add the class
    link.className = "delete-item secondary-content";

    // add the icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);

    // append the li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task");
  }

  // Create a List Item
  const li = document.createElement("li");

  // Add a Calss
  li.classList = "collection-item";

  // Create a text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a new link
  const link = document.createElement("a");

  // add the class
  link.className = "delete-item secondary-content";

  // add the icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // append the link to li
  li.appendChild(link);

  // append the li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // clear the input
  taskInput.value = "";
  e.preventDefault();
}
// Store Task In Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  // Set it back to local Storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  // Since there are multiple fa-remove and they are also dynamically added so we will use class delegation , we will apply click event on parent and from that we will get its target and if the targit is what we are lookign for then we will do a perticuler action

  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from Ls
function removeTaskFromLocalStorage(taskItem) { 
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clearTasks
function clearTasks() {
  //  taskList.innerHTML = '';

  // Batter and Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks for LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
