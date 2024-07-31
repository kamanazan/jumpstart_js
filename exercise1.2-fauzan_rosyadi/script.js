const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const template = document.querySelector('#contentTodo');

function addTodo() {
  const newTodo = todoInput.value;
  console.log(newTodo)
  if (newTodo){
    const newTodoList = template.content.cloneNode(true)  //document.createElement('li');
    const span = newTodoList.querySelector('span')
    const input = newTodoList.querySelector('input');
    const saveBtn = newTodoList.querySelector('#saveButton');
    const editBtn = newTodoList.querySelector('#editButton');
    const completeBtn = newTodoList.querySelector('#completeButton');
    const removeBtn = newTodoList.querySelector('#removeButton');
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
}

function markComplete(event) {
  const button = event.target;
  const content = button.parentNode.querySelector('span');
  if (content.classList.contains('todo-complete')) {
    content.classList.remove('todo-complete');
    button.textContent = 'mark complete'
  } else {
    content.classList.add('todo-complete');
    button.textContent = 'unmark';
  }
}


function removeTodo(event) {
  const button = event.target;
  const parent = button.parentNode;
  parent.remove();
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
}
