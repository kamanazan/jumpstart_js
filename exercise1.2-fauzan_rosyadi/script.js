const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');

function addTodo() {
  // TODO: Implement the addTodo function
  const newTodo = todoInput.value;
  if (newTodo){
    const newTodoList = document.createElement('li');
    newTodoList.textContent = newTodo;
    todoList.append(newTodoList);
  }
}

// TODO: Implement a function to mark tasks as complete
// TODO: Implement a function to remove tasks
