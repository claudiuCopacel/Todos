const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector("#filter");
const form = document.querySelector("h1");

// EVENT---------------------
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", del);
filter.addEventListener("click", filterTodo);

// FUNCTIONS-----------------

function addTodo(e) {
  e.preventDefault();
  if (todoInput.value == "") {
    form.classList.add("shake");
  } else {
    // create DIV
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo-div");
    // CREATE LI
    const newLi = document.createElement("li");
    newLi.classList.add("todo-li");
    newLi.innerText = todoInput.value;
    newDiv.appendChild(newLi);
    // ADD TODO TO LOCAL STORAGE
    saveLocal(todoInput.value);
    // complete BUTTONS
    const comButton = document.createElement("button");
    comButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    comButton.classList.add("btn", "comBtn");
    newDiv.appendChild(comButton);
    //   Del BUTTONS
    const delButton = document.createElement("button");
    delButton.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    delButton.classList.add("btn", "delBtn");
    newDiv.appendChild(delButton);
    // Append to list
    todoList.appendChild(newDiv);
  }

  //  reset

  form.addEventListener("animationend", function () {
    form.classList.remove("shake");
  });
  todoInput.value = "";
}
//  prin functia asta noi setam o variabila item care sa fie setata ca event.target, in momentul in care noi avem un event de exemplu click, acest e.target va selecta itemul ep care ai apasat, si facem un if statement rapid, precum ca daca itemul pe care lam apasat contine clasa x sa-i dam remove respectiv sa stearga scrisul.
function del(e) {
  const item = e.target;
  // DELETE
  if (item.classList[1] === "delBtn") {
    const parent = item.parentElement;
    // animation
    parent.classList.add("deleted");
    removeLocalTodos(parent);
    // parent.remove();
    parent.addEventListener("transitionend", function () {
      parent.remove();
    });
  }

  // DONE
  if (item.classList[1] === "comBtn") {
    const parent = item.parentElement;
    parent.classList.toggle("completed");
  }
}

// FILTER

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    // swich statement, e.target.value in cazul de fata eventul se alfa la filtru. target reprezinta all / compreted/ unconpleted si value la el in sine all... etc
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

function saveLocal(todo) {
  // CHECK
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // create DIV
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo-div");
    // CREATE LI
    const newLi = document.createElement("li");
    newLi.classList.add("todo-li");
    newLi.innerText = todo;
    newDiv.appendChild(newLi);
    todoInput.value = "";
    // complete BUTTONS
    const comButton = document.createElement("button");
    comButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    comButton.classList.add("btn", "comBtn");
    newDiv.appendChild(comButton);
    //   Del BUTTONS
    const delButton = document.createElement("button");
    delButton.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    delButton.classList.add("btn", "delBtn");
    newDiv.appendChild(delButton);
    // Append to list
    todoList.appendChild(newDiv);
  });
}
