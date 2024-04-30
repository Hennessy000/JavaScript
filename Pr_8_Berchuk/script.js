
const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');


function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}


function updateCounter(todos) {
  itemCountSpan.textContent = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.completed).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}


function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.completed ? 'checked' : ''} onchange="checkTodo(${todo.id})">
      <label for="${todo.id}" class="${todo.completed ? 'text-success text-decoration-line-through' : ''}">${todo.text}</label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}


function render(todos) {
  const todoList = todos.map(todo => renderTodo(todo)).join('');
  list.innerHTML = todoList;
}


function newTodo() {
  const todoText = prompt("Введіть нову справу:");
  if (todoText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newTodo = {
      id: todos.length + 1,
      text: todoText,
      completed: false
    };
    todos.push(newTodo);
    saveTodos(todos);
    render(todos);
    updateCounter(todos);
  }
}


function deleteTodo(id) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.id !== id);
  saveTodos(todos);
  render(todos);
  updateCounter(todos);
}


function checkTodo(id) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todo = todos.find(todo => todo.id === id);
  todo.completed = !todo.completed;
  saveTodos(todos);
  render(todos);
  updateCounter(todos);
}


document.addEventListener('DOMContentLoaded', () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  render(todos);
  updateCounter(todos);
});
