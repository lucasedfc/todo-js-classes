import { countTodo } from "../js/components";
import { Todo } from "./todo.class";

export class TodoList {
  constructor() {
    this.loadLocalStorage();
    this.countTodo();
  }

  addTodo(task) {
    this.todos.push(task);
    this.saveToLocalStorage();
    this.countTodo();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveToLocalStorage();
    this.countTodo();
  }

  toggleTodo(id) {
    for (const todo of this.todos) {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        break;
      }
    }
    this.saveToLocalStorage();
    this.countTodo();
  }

  deleteCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }

  loadLocalStorage() {
    this.todos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];

    // this.todos = this.todos.map(todo => Todo.fromJson(todo))
    this.todos = this.todos.map(Todo.fromJson)
  }

  countTodo() {
    let pendingCount = 0;
    let countBox = countTodo.firstElementChild;
    for (let todo of this.todos) {
        (!todo.completed === true) ? pendingCount++ : null;
    }
    countBox.innerHTML = pendingCount;
}
}
