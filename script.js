document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoText");
    const addButton = document.getElementById("AddUpdateClick");
    const todoList = document.getElementById("list-items");
    const alertMessage = document.getElementById("Alert");

    let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

    function showAlert(msg, color = "green") {
        alertMessage.innerText = msg;
        alertMessage.style.color = color;
        setTimeout(() => alertMessage.innerText = "", 2000);
    }

    function saveTodos() {
        localStorage.setItem("todo-list", JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            let li = document.createElement("li");
            li.classList.add("todo-item");
            li.style.display = "flex"; // Ensure items are in a row
            li.style.justifyContent = "space-between"; // Space between text and buttons
            li.style.alignItems = "center"; // Align vertically
            li.style.width = "100%"; // Ensure full width
            li.style.margin = "5px 0"; // Add some spacing
            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="actions" style="display: flex; gap: 10px;">
                    <button onclick="editTodo(${index})">&#x270F</button>
                    <button onclick="deleteTodo(${index})">&#x1F6AE;</button>
                </div>`;
            todoList.appendChild(li);
        });
    }

    function addTodo() {
        let task = todoInput.value.trim();
        if (task === "") {
            showAlert("Please enter a task!", "red");
            return;
        }
        if (todos.some(todo => todo.text === task)) {
            showAlert("Task already exists!", "red");
            return;
        }

        todos.push({ text: task });
        saveTodos();
        renderTodos();
        todoInput.value = "";
        showAlert("Todo item added successfully!");
    }

    window.editTodo = function(index) {
        let newText = prompt("Edit your task:", todos[index].text);
        if (newText) {
            todos[index].text = newText;
            saveTodos();
            renderTodos();
            showAlert("Todo item updated successfully!");
        }
    }

    window.deleteTodo = function(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
            showAlert("Todo item deleted successfully!");
        }
    }

    addButton.addEventListener("click", addTodo);
    renderTodos();
});
