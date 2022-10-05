import { todoList } from "../index";
import { Todo } from "../classes";

//html ref
const divTodoList = document.querySelector(".todo-list");
const inputTxt = document.querySelector(".new-todo");
const btnDeleteCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const anchorFilter = document.querySelectorAll(".filter");
export const countTodo = document.querySelector('.todo-count'); 

export const createTodoHTML = (todo) => {
  const htmlTodo = `
                    <li class="${todo.completed ? "completed" : ""}" data-id="${
    todo.id
  }">
						<div class="view">
							<input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
							<label>${todo.task}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};

//Events

inputTxt.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && inputTxt.value.length > 0) {
    const newTodo = new Todo(inputTxt.value);
    todoList.addTodo(newTodo);
    createTodoHTML(newTodo);
    inputTxt.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  const elementName = event.target.localName; // input || label || button
  const todoElement = event.target.parentElement.parentElement;
  const todoId = todoElement.getAttribute("data-id");

  if (elementName.includes("input")) {
    todoList.toggleTodo(todoId);
    todoElement.classList.toggle("completed");
  } else if (elementName.includes("button")) {
    todoList.deleteTodo(todoId);
    divTodoList.removeChild(todoElement);
  }
});

btnDeleteCompleted.addEventListener("click", () => {
  todoList.deleteCompleted();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const element = divTodoList.children[i];
    if (element.classList.contains("completed")) {
      divTodoList.removeChild(element);
    }
  }
});

// Filter Events
ulFilters.addEventListener("click", (event) => {

  const filter = event.target.text;
  if (!filter) {
    return;
  }

  anchorFilter.forEach(element => {
        element.classList.remove('selected');
  });

  event.target.classList.add('selected')

  for (const element of divTodoList.children) {
    element.classList.remove("hidden");
    const isCompleted = element.classList.contains("completed");

    switch (filter) {
      case "Pending":
        if (isCompleted) {
          element.classList.add("hidden");
        }
        break;
      case "Completed":
        if (!isCompleted) {
          element.classList.add("hidden");
        }
        break;
    }
  }
});
