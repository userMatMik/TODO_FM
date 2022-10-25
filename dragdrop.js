import { tasksContainer } from "./app.js";
import { tasksArray } from "./app.js";
import { updateLocalStorage } from "./app.js";

let sortable = new Sortable(tasksContainer, {
    animation: 125,
    draggable: '.task',
    ghostClass: 'dragging',
    onEnd: (e) => {
        const draggedElement = e.item;
        const draggedElementID = draggedElement.getAttribute('id');
        const newList = document.querySelectorAll('.task');

        const newIndex = [...newList].findIndex((task) => task.getAttribute('id') === draggedElementID);
        const taskIndexToUpdate = tasksArray.findIndex((task) => task.id == draggedElementID);

        let cuttedElement = tasksArray.splice(taskIndexToUpdate, 1)[0];
        tasksArray.splice(newIndex, 0, cuttedElement);

        updateLocalStorage();
    }
})


// tasksContainer.addEventListener('dragstart', (e) => {
//     e.target.classList.add('dragging');
// })

// tasksContainer.addEventListener('dragend',(e) => {
//     const draggedElement = document.querySelector('.dragging');
//     const draggedElementID = draggedElement.getAttribute('id');
    
//     const taskToIndex = [...document.querySelectorAll('.task')].findIndex((task) => task.getAttribute('id') === draggedElement.getAttribute('id'))

//     const taskToUpdate = tasksArray.findIndex((task) => task.id == draggedElementID);

//     let cuttedElement = tasksArray.splice(taskToUpdate, 1)[0]
//     tasksArray.splice(taskToIndex, 0, cuttedElement)

//     updateLocalStorage();

//     e.target.classList.remove('dragging');
// } )

// tasksContainer.addEventListener('dragover', (e) => {
//     e.preventDefault();

//     const draggedElement = document.querySelector('.dragging');
//     const currentElement = e.target;

//     const canSort = draggedElement !== currentElement && currentElement.classList.contains('task');
//     if (!canSort) { return; }

//     const nextElement = getNextElement(e.clientY, currentElement);

//     if (nextElement && draggedElement === nextElement.previousElementSibling || draggedElement === nextElement) {
//         return;
//     }

//     tasksContainer.insertBefore(draggedElement, nextElement);

// })  

// const getNextElement = (cursorPosition, currentElement) => {
//     const currentElementCoordinates = currentElement.getBoundingClientRect();
//     const currentElementCenter = currentElementCoordinates.y + currentElementCoordinates.height / 2;

//     return (cursorPosition < currentElementCenter) ? currentElement : currentElement.nextElementSibling;
// }
