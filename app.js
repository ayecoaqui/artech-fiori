let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

/* AGREGAR CON ENTER */
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return alert("Escribe algo!");

    const task = {
        id: Date.now(),
        text,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        // Ícono check personalizado
        const checkBtn = document.createElement("button");
        checkBtn.classList.add("icon-btn", "check-btn");
        checkBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
                <circle cx="12" cy="12" r="10"></circle>
                ${task.completed ? `<path d="M8 12l3 3 5-5"></path>` : ""}
            </svg>
        `;
        checkBtn.onclick = () => toggleComplete(task.id);

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        if (task.completed) textSpan.classList.add("completed");

        const editBtn = document.createElement("button");
        editBtn.classList.add("icon-btn");
        editBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5l4 4L8 20l-4 1 1-4 11.5-13.5z"/>
            </svg>
        `;
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("icon-btn");
        deleteBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
                <path d="M3 6h18"/>
                <path d="M8 6v14h8V6"/>
                <path d="M10 10v6M14 10v6"/>
                <path d="M9 6V4h6v2"/>
            </svg>
        `;
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(checkBtn);
        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Editar tarea:", task.text);

    if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
