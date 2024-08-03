const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const template = document.querySelector('#contentTodo');
const savedTodo = window.localStorage.getItem('todoList');

// TODO: implement filter

function restoreTodoList() {
  const todoList = JSON.parse(savedTodo);
  todoList.forEach(t => {
    createElement(t[0], t[1]);
  })
}

// DOMContentLoaded may fire before your script has a chance to run, so it is wise to check before adding a listener.
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", restoreTodoList);
} else {
  // `DOMContentLoaded` has already fired
  restoreTodoList();
}

function updateStorage() {
  const todo = document.querySelector('#todoList');
  const todoList = todo.querySelectorAll('li span');
  const data = [];
  todoList.forEach(t => {
    data.push([t.textContent, t.classList.contains('todo-complete')])
  });
  window.localStorage.setItem('todoList', JSON.stringify(data));
}

function createElement(newTodo, isComplete) {
  const newTodoList = template.content.cloneNode(true)  //document.createElement('li');
  const span = newTodoList.querySelector('span')
  const input = newTodoList.querySelector('input');
  const saveBtn = newTodoList.querySelector('#saveButton');
  const editBtn = newTodoList.querySelector('#editButton');
  const completeBtn = newTodoList.querySelector('#completeButton');
  const removeBtn = newTodoList.querySelector('#removeButton');
  if (isComplete) {
    span.classList.add('todo-complete');
    completeBtn.textContent = 'unmark';
    editBtn.classList.add('hide');
  }
  input.classList.add('hide');
  saveBtn.classList.add('hide');
  span.textContent = newTodo;
  completeBtn.onclick = markComplete;
  removeBtn.onclick = removeTodo;
  editBtn.onclick = editTodo;
  saveBtn.onclick = saveTodo;
  todoList.appendChild(newTodoList);
  todoInput.value = '';
}
function addTodo() {
  const newTodo = todoInput.value;
  console.log(newTodo)
  if (newTodo){
    createElement(newTodo, false);
    updateStorage();
  }
}

function markComplete(event) {
  const button = event.target;
  const content = button.parentNode.querySelector('span');
  const editBtn = button.parentNode.querySelector('#editButton');
  if (content.classList.contains('todo-complete')) {
    content.classList.remove('todo-complete');
    editBtn.classList.remove('hide');
    button.textContent = 'mark complete'
  } else {
    content.classList.add('todo-complete');
    editBtn.classList.add('hide');
    button.textContent = 'unmark';
  }
  updateStorage();
}


function removeTodo(event) {
  const button = event.target;
  const parent = button.parentNode;
  parent.remove();
  updateStorage();
}

function editTodo(event) {
  const button = event.target;
  const parent = button.parentNode;
  const span = parent.querySelector('span')
  const input = parent.querySelector('input');
  const saveBtn = parent.querySelector('#saveButton');
  const editBtn = parent.querySelector('#editButton');
  const completeBtn = parent.querySelector('#completeButton');
  const removeBtn = parent.querySelector('#removeButton');
  span.classList.add('hide');
  input.classList.remove('hide');
  saveBtn.classList.remove('hide');
  editBtn.classList.add('hide');
  completeBtn.classList.add('hide');
  removeBtn.classList.add('hide');
  input.value = span.textContent;
}

function saveTodo(event) {
  const button = event.target;
  const parent = button.parentNode;
  const span = parent.querySelector('span')
  const input = parent.querySelector('input');
  const saveBtn = parent.querySelector('#saveButton');
  const editBtn = parent.querySelector('#editButton');
  const completeBtn = parent.querySelector('#completeButton');
  const removeBtn = parent.querySelector('#removeButton');
  const newVal = input.value;
  if (newVal) {
    span.textContent = input.value;
  }
  span.classList.remove('hide');
  input.classList.add('hide');
  saveBtn.classList.add('hide');
  editBtn.classList.remove('hide');
  completeBtn.classList.remove('hide');
  removeBtn.classList.remove('hide');
  updateStorage();
}
