

const createTask = (task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    
    const checkboxElement = document.createElement('input');
    checkboxElement.setAttribute('type', 'checkbox');
    checkboxElement.classList.add('task__check');

    const taskContent = document.createElement('p');
    taskContent.classList.add('task__text');
    taskContent.textContent = task;

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
    console.log(newTaskContent);

    tasksContainer.appendChild(createTask(newTaskContent));
    document.querySelector('#task-input').value = "";
})