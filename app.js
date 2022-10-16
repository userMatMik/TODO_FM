let tasksArray;

tasksArray = JSON.parse(localStorage.getItem('tasks'));
console.log(localStorage)
console.log(tasksArray)

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

const renderTask = ({id, text, isCompleted}) => {
    const taskItem = document.createElement('li');
    taskItem.setAttribute('id', id);
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


const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

if ( tasksArray != null) {
    window.onload = tasksArray.forEach((task) => {
        const tasksContainer = document.querySelector('.tasks__container');
        tasksContainer.appendChild(renderTask(task));
    })
}
