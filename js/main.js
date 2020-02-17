const input = document.querySelector('[data-input]');
const clearButton = document.querySelector('[data-clear-all]');
const clearNotification = document.querySelector('[data-clear-notification]');
const todoList = document.querySelector('[data-todo-list]');
const tasksCount = document.querySelector('[data-tasks-count]');
const filterAll = document.querySelector('[data-filter-all]');
const filterUncompleted = document.querySelector('[data-filter-uncompleted]');
const filterComplete = document.querySelector('[data-filter-complete]');
let sortedArr;
class TodoList {
    constructor() {
        this.itemText = null;
    }
    addTask() {
        if (this.itemText != null && this.itemText != '') {
            let todoItem = document.createElement('li');
            todoItem.innerHTML = `<i class="far fa-circle"></i>${this.itemText}`
            todoItem.addEventListener('click', (event) => {
                this.checkComplete(event)
            })
            todoItem.setAttribute('data-mark-complete', 'false')
            todoList.prepend(todoItem);
            input.value = '';
            this.itemText = null;
        }
    }
    checkComplete(event) {
        target = event.target;
        if (target.tagName == 'I') {
            if (target.classList.contains('fa-circle')) {
                target.classList.remove('fa-circle');
                target.classList.add('fa-check-circle');
                target.parentElement.style.textDecoration = 'line-through';
            } else {
                target.classList.remove('fa-check-circle');
                target.classList.add('fa-circle');
                target.parentElement.style.textDecoration = 'none';
            }
            target.parentElement.setAttribute('data-mark-complete', 'true')
        }
    }
    clear() {
        document.querySelectorAll('ul li').forEach(item => item.remove());
        tasksCount.innerHTML = '';
        clearNotification.innerText = 'Список очищен';
        setTimeout(() => {
            clearNotification.innerText = ''
        }, 3000)
    }
    taskCount() {
        tasksCount.innerHTML = `Заданий осталось: ${Array.from(document.querySelectorAll('[data-todo-list] li')).length}`;
    }
    filterAll() {
        Array.from(document.querySelectorAll('[data-todo-list] li')).forEach(item => {
            item.classList.remove('hide');
        })
    }
    filter(arr, filterArg) {
        sortedArr = Array.from(arr).filter(item => item.getAttribute('data-mark-complete') == filterArg);
        arr.forEach(item => item.classList.add('hide'))
        sortedArr.forEach(item => item.classList.remove('hide'))
    }
}

let todo = new TodoList();
let target;

input.addEventListener("keyup", function (event) {
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

filterAll.addEventListener('click', () => {
    todo.filterAll();
})

filterComplete.addEventListener('click', () => {
    todo.filter(document.querySelectorAll('[data-todo-list] li'), 'true');
})

filterUncompleted.addEventListener('click', () => {
    todo.filter(document.querySelectorAll('[data-todo-list] li'), 'false');
})