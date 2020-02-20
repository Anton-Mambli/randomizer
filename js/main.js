const input = document.querySelector('[data-input]');
const clearButton = document.querySelector('[data-clear-all]');
const clearNotification = document.querySelector('[data-clear-notification]');
const todoList = document.querySelector('[data-todo-list]');
const tasksCount = document.querySelector('[data-tasks-count]');
const filterAll = document.querySelector('[data-filter-all]');
const filterUncompleted = document.querySelector('[data-filter-uncompleted]');
const filterComplete = document.querySelector('[data-filter-complete]');
let todoElem = document.querySelector('[data-todo-list]').children;

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
            todoItem.style.animation = '2s fadeIn';
            todoItem.style.opacity = '1';
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
                target.parentElement.style.animation = '1.5s check'
                target.parentElement.style.opacity = '0.5';
                target.parentElement.style.textDecoration = 'line-through';
            } else {
                target.classList.remove('fa-check-circle');
                target.classList.add('fa-circle');
                target.parentElement.style.animation = '1.5s uncheck'
                target.parentElement.style.opacity = '1';
                target.parentElement.style.textDecoration = 'none';
            }
            target.parentElement.setAttribute('data-mark-complete', 'true')
        }
    }
    clear() {
        document.querySelectorAll('ul li').forEach(item => item.remove());
        tasksCount.innerHTML = '';
        clearNotification.innerText = 'Список очищен';
        clearNotification.style.animation = '1s fadeIn';
        clearNotification.style.opacity = '1';
        setTimeout(() => {
            clearNotification.style.animation = '1s fadeOut';
            clearNotification.style.opacity = '0';
        }, 3000);
    }
    taskCount() {
        tasksCount.innerHTML = `Заданий осталось: ${todoElem.length}`;

    }
    filterAll() {
        Array.from(todoElem).forEach(item => {
            item.classList.remove('hide');
            item.style.animation = '2s fadeIn';
            item.style.opacity = '1';
        })
    }
    filter(arr, filterArg) {
        arr = Array.from(arr);
        sortedArr = arr.filter(item => item.getAttribute('data-mark-complete') == filterArg);
        arr.forEach(item => {
            item.style.animation = '2s fadeOut';
            item.style.opacity = '0';
            item.classList.add('hide')
        })
        sortedArr.forEach(item => {
            item.classList.remove('hide');
            item.style.animation = '2s fadeIn';
            item.style.opacity = '1';
        })
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
    todo.filter(todoElem, 'true');
})

filterUncompleted.addEventListener('click', () => {
    todo.filter(todoElem, 'false');
})