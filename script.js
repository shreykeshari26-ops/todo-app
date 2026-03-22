// 🌍 Global array
let tasks = [];


// 📅 Get selected date
function getSelectedDate() {
    let selected = document.getElementById("selectedDate").value;

    if (selected === "") {
        return new Date().toISOString().split("T")[0];
    }

    return selected;
}


// ➕ Add Task
function addTask() {

    let input = document.getElementById("taskInput");
    let taskText = input.value;

    let noteInput = document.getElementById("taskNote");
    let noteText = noteInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        text: taskText,
        note: noteText,
        date: getSelectedDate(),
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    input.value = "";
    noteInput.value = "";
    input.focus();
}


// 💾 Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 📥 Load tasks
function loadTasks() {
    let saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
    }
}


// 🖥️ Render tasks
function renderTasks() {

    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let selectedDate = getSelectedDate();
    let todayTasks = tasks.filter(task => task.date === selectedDate);

    todayTasks.forEach((task) => {

        let li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${task.text}</strong><br>
                <small>${task.note}</small>
            </div>
        `;

        // ✅ Completed style
        if (task.completed) {
            li.classList.add("completed");
        }

        // ✅ Toggle complete
        li.onclick = function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        // ❌ Delete button
        let btn = document.createElement("button");
        btn.innerText = "X";

        btn.onclick = function (e) {
            e.stopPropagation();

            let actualIndex = tasks.indexOf(task); // ✅ FIX
            tasks.splice(actualIndex, 1);

            saveTasks();
            renderTasks();
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}


// 📅 Show today's date
let today = new Date();
document.getElementById("todayDate").innerText = today.toDateString();


// ✅ Set default date
let todayInput = document.getElementById("selectedDate");
todayInput.value = new Date().toISOString().split("T")[0];


// ⌨️ Enter key
document.getElementById("taskInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});


// 🔄 Change date → re-render
document.getElementById("selectedDate").addEventListener("change", function() {
    renderTasks();
});


// 🚀 Init
loadTasks();
renderTasks();
