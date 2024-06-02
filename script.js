// DOM Manipulation
/* 
    Document Object Model (DOM) == HTML
    - Structure of our code

    DOM Manipulation
    - Targetting and Modifying our Document (HTML)
*/

// Targetting DOM elements
/* Query Selector targets the FIRST OCCURENCE of a certain target */
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners - track for user inputs
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCompleteTodo);
filterOption.addEventListener("click", filterTodo);

function addTodo(e) {
    // event, preventDefault to stop it from refreshing
    e.preventDefault();

    // create an element to add to our DOM
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Add a task from the input
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    // Add newTodo to the div
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    // Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Create Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // add it to an existing element on the page
    todoList.appendChild(todoDiv);
}

function deleteOrCompleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");

        todo.addEventListener("transitionend", () =>
            item.parentElement.remove()
        );
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        // add if not existing, remove if existing
        todo.classList.toggle("completed");
        console.log(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
