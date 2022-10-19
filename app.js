export const tasksContainer = document.querySelector('.tasks__container');
export let tasksArray;

tasksArray = JSON.parse(localStorage.getItem('tasks'));

//filters
const handleFilters = (e) => {
    const clickedFilter = e.target;
    const allFilters = document.querySelectorAll('.tasks__filter');
    let counter = document.querySelector('.tasks__count');
    let filteredArray;

    allFilters.forEach((filter) => filter.classList.remove('active'))
    clickedFilter.classList.add('active');
   
    if (clickedFilter.innerText === 'Active') {
        filteredArray = tasksArray.filter((task) => task.isCompleted === false);
        tasksContainer.innerHTML = "";
        filteredArray.forEach((task) => {
            tasksContainer.appendChild(renderTask(task));
        })
        counter.textContent = `${filteredArray.length} items left`; 
    } else if (clickedFilter.innerText === 'Completed') {
        filteredArray = tasksArray.filter((task) => task.isCompleted === true);
        tasksContainer.innerHTML = "";
        filteredArray.forEach((task) => {
            tasksContainer.appendChild(renderTask(task));
        })
        counter.textContent = `${filteredArray.length} items left`;
    } else {
        tasksContainer.innerHTML = "";
        tasksArray.forEach((task) => {
            tasksContainer.appendChild(renderTask(task));
        })
        counter.textContent = `${tasksArray.length} items left`
    }
}

document.querySelectorAll('.tasks__filter').forEach((filter) => {
    filter.addEventListener('click', handleFilters)
})

// change task status
const changeStatus = (e) => {
    if (!e.target.classList.contains('task__check')) {
        return
    } else {
        const taskEl = e.target.closest('li');
        const taskID = taskEl.getAttribute('id');
        const taskToUpdate = tasksArray.find((task) => task.id == taskID);
        taskToUpdate.isCompleted = !taskToUpdate.isCompleted
        updateLocalStorage();
    } 
} 

document.querySelector('.tasks__container').addEventListener('change', changeStatus);

// clear all completed tasks
const clearAllCompleted = () => {
    completedBtn = document.querySelector('#completed');
    tasksArray = tasksArray.filter((task) => (task.isCompleted === false))
    tasksContainer.innerHTML = "";
    
    if (completedBtn.classList.contains('active')) {
        return
    } else {
        tasksArray.forEach((task) => {
            tasksContainer.appendChild(renderTask(task))
        })
    }
    
    updateLocalStorage();
}

document.querySelector('#clear-completed').addEventListener('click', clearAllCompleted)

//remove task
const removeTask = (e) => {
    if(e.target.classList.contains('task__remove-btn') || e.target.classList.contains('task__remove-icon')) {
        const taskToRemove = e.target.closest('li')
        taskToRemove.remove();
        tasksArray = tasksArray.filter((task) => {
            return task.id !== +taskToRemove.getAttribute('id')
        })
        updateLocalStorage();
    } else {
        return
    }
} 

document.querySelector('.tasks__container').addEventListener('click', removeTask)

const updateCounter = () => {
    const counter = document.querySelector('.tasks__count');
    counter.textContent = `${tasksArray.length} items left`
}

// render task
const renderTask = ({id, text, isCompleted}) => {
    const taskItem = document.createElement('li');
    taskItem.setAttribute('id', id);
    taskItem.setAttribute('draggable', 'true');
    taskItem.classList.add('task');
    
    const checkboxElement = document.createElement('input');
    checkboxElement.setAttribute('type', 'checkbox');
    checkboxElement.classList.add('task__check');
    isCompleted ? checkboxElement.checked = true : checkboxElement.checked = false;

    const taskContent = document.createElement('p');
    taskContent.classList.add('task__text');
    taskContent.textContent = text;

    const removeTaskBtn = document.createElement('button');
    removeTaskBtn.classList.add('task__remove-btn')
    const removeIcon = document.createElement('img');
    removeIcon.setAttribute('src', '/images/icon-cross.svg');
    removeIcon.classList.add('task__remove-icon');

    removeTaskBtn.appendChild(removeIcon);

    taskItem.appendChild(checkboxElement);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(removeTaskBtn);
    
    return taskItem;
}

// add task
document.querySelector('.add-task__btn').addEventListener('click', (e) => {
    e.preventDefault();
    const tasksContainer = document.querySelector('.tasks__container');
    let newTaskContent = document.querySelector('#task-input').value;

    let newTask = {
        id: Date.now(),
        text: newTaskContent,
        isCompleted: false,
    }

    console.log(newTask)
    tasksArray = tasksArray || [];
    tasksArray.push(newTask);
    
    updateLocalStorage();

    tasksContainer.appendChild(renderTask(newTask));
    document.querySelector('#task-input').value = "";
})


export const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

if ( tasksArray != null) {
    window.onload = tasksArray.forEach((task) => {
        tasksContainer.appendChild(renderTask(task));
    })
}
