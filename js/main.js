const input = document.querySelector('[data-input]');
const clearButton = document.querySelector('[data-clear-all]');
const clearNotification = document.querySelector('[data-clear-notification]');
const todoList = document.querySelector('[data-todo-list]');
const tasksCount = document.querySelector('[data-tasks-count]');
const filterAll = document.querySelector('[data-filter-all]');
const filterUncompleted = document.querySelector('[data-filter-uncompleted]');
const filterComplete = document.querySelector('[data-filter-complete]');

class TodoList {
    constructor () {
        this.itemText = null;
    }
    addTask () {
        if (this.itemText !== null) {
            let todoItem = document.createElement('li');
            todoItem.innerHTML = `<i class="far fa-circle"></i> ${this.itemText}`
           todoList.prepend(todoItem);
           
           input.value = '';
           this.itemText = null;
        }
    }
    checkComplete () {

    }
    checkUncompleted () {

    }
    clear () {
        document.querySelectorAll('ul li').forEach(item => item.remove());
        tasksCount.innerHTML = '';
        clearNotification.innerText = 'Список очищен';
        setTimeout(() => {
            clearNotification.innerText = ''
        }, 3000)
    }
    taskCount () {
       
        tasksCount.innerHTML = `Заданий осталось: ${todoList.childNodes.length - 1}`
      
    }
    filterAll () {

    }
    filterUncompleted () {
        
    }
    filterCompleted () {
        
    }
}

let todo = new TodoList();

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      todo.itemText = input.value;
      todo.addTask();
      todo.taskCount()
    }
  });

  clearButton.addEventListener('click', () => {
      todo.clear();
  })