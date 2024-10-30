//Selectors
const todoList = document.querySelector('.todo-list');
const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(e) {
  //prevent from refresh
  e.preventDefault();

  const markup = `
        <div class="todo">
          <li class="todo-item">${todoInput.value}</li>
          <button class="complete-btn"><i class="fa fa-check"></i></button>
          <button class="trash-btn"><i class="fa fa-trash"></i></button>
        </div> 
        `;
  todoList.insertAdjacentHTML('afterbegin', markup);
  saveLocalTodos(todoInput.value);
  todoInput.value = '';
}

function deleteCheck(e) {
  const todo = e.target.closest('.todo');

  if (e.target.closest('.trash-btn')) {
    removeLocalTodos(todo);
    todo.classList.add('fall');
    todo.addEventListener('transitionend', () => todo.remove());
  }

  if (e.target.closest('.complete-btn')) todo.classList.toggle('completed');
}

function filterTodo(e) {
  const todos = Array.from(todoList.childNodes).filter(
    node =>
      node.nodeType === Node.ELEMENT_NODE && node.classList.contains('todo')
  );
  console.log(todos);
  todos.forEach(function (todo) {
    console.log(e.target.value);
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'incompleted':
        console.log(!todo.classList.contains('completed'));
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(todo => {
    const markup = `
        <div class="todo">
          <li class="todo-item">${todo}</li>
          <button class="complete-btn"><i class="fa fa-check"></i></button>
          <button class="trash-btn"><i class="fa fa-trash"></i></button>
        </div> 
        `;
    todoList.insertAdjacentHTML('afterbegin', markup);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const textItemClicked = todo.children[0].innerText;
  todos.splice(todos.indexOf(textItemClicked), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
