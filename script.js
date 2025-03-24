// Task class to represent each task
class Task {
    constructor(name, description, status = "Pending") {
        this.name = name;
        this.description = description;
        this.status = status;
    }
}

// Array to store tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks(filter = "All") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks
    let flag = true;
    tasks.filter(task => filter === "All" || task.status === filter)
        .forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task");
            taskItem.innerHTML = `
                <div>
                    <strong style='color:black'>${task.name}</strong>
                    <p style='color:black'>${task.description}</p>
                    <p style='color:black'>Status: ${task.status}</p>
                </div>
                <div class="task-buttons">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                    <button onclick="toggleStatus(${index})">
                        ${task.status === "Pending" ? "Completed" : "Pending"}
                    </button>
                </div>
            `;
            taskList.appendChild(taskItem);
            flag = false;
        });
    if(flag === true && filter === "Completed"){
        taskList.innerHTML = `
            <div>
                <strong style='color:black'>No Task is Completed.</strong>
            </div>
        `;
    }
    else if(flag === true && filter === "Pending"){
        taskList.innerHTML = `
            <div>
                <strong style='color:black'>No Task is Pending.</strong>
            </div>
        `;
    }
    else if(flag === true && filter === "All"){
        taskList.innerHTML = `
            <div>
                <strong style='color:black'>No Task is Available.</strong>
            </div>
        `;
    }
    
}

// Add task
document.getElementById("addTask").addEventListener("click", () => {
    const name = document.getElementById("taskName").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    if(name) {
        tasks.push(new Task(name, description));
        saveTasksToLocalStorage();
        // renderTasks();
    }else {
        alert("Task name is required.");
    }
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskList").innerHTML = "";
});

// Save tasks to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Edit task
function editTask(index) {
    const task = tasks[index];
    const name = prompt("Edit Task Name:", task.name);
    const description = prompt("Edit Task Description:", task.description);
    if(name) task.name = name;
    if(description) task.description = description;
    saveTasksToLocalStorage();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
}

// Toggle task status
function toggleStatus(index) {
    tasks[index].status = tasks[index].status === "Pending" ? "Completed" : "Pending";
    saveTasksToLocalStorage();
    renderTasks();
}

// Show All tasks
document.getElementById("showAllTask").addEventListener("click", () => renderTasks("All"));

// Filter tasks
document.getElementById("filterPending").addEventListener("click", () => renderTasks("Pending"));
document.getElementById("filterCompleted").addEventListener("click", () => renderTasks("Completed"));

// Initial render
renderTasks();