const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');

function addTodo() {
  // TODO: Implement the addTodo function
  const newTodo = todoInput.value;
  if (newTodo){
    // const idTodo = `todo-${new Date().getTime()}`
    const newTodoList = document.createElement('li');
    // newTodoList.setAttribute('id', idTodo)
    newTodoList.textContent = newTodo;
    newTodoList.onclick = markComplete;
    todoList.append(newTodoList);
    todoInput.value = '';
  }
}

function markComplete(event) {
 console.log(event);
 if (event.target.classList.contains('todo-complete')) {
   event.target.classList.remove('todo-complete');
 } else {
   event.target.classList.add('todo-complete');
 }
}

// TODO: Implement a function to remove tasks
