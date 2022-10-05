import './styles.css';

import { TodoList } from "./classes";
import { createTodoHTML } from './js/components';
export const todoList = new TodoList();

todoList.todos.forEach(todo => createTodoHTML(todo));

