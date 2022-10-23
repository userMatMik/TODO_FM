import { tasksContainer } from "./app.js";
import { tasksArray } from "./app.js";
import { updateLocalStorage } from "./app.js";
// console.log(tasksArray)

let sortable = new Sortable(tasksContainer, {
    animation: 125,
    draggable: '.task',
    ghostClass: 'dragging',
    onEnd: (e) => {
        const draggedElement = e.item;
        const draggedElementID = draggedElement.getAttribute('id');
        const newList = document.querySelectorAll('.task');

        const newIndex = [...newList].findIndex((task) => task.getAttribute('id') === draggedElementID);
        console.log('new index: ', newIndex )
        const taskIndexToUpdate = tasksArray.findIndex((task) => task.id == draggedElementID);
        console.log('old index: ', taskIndexToUpdate)

        let cuttedElement = tasksArray.splice(taskIndexToUpdate, 1)[0];
        tasksArray.splice(newIndex, 0, cuttedElement);

        console.log(tasksArray)
        updateLocalStorage();
    }
})


let testArr = [1, 2, 3, 4, 5, 6]

let cutted = testArr.splice(2, 1)[0];

console.log(cutted);

testArr.splice(4, 0, cutted)

console.log(testArr)




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
//     // console.log(draggedElement)
//     // console.log(currentElement)

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





//---------mobile ------------
// btn.addEventListener('touchstart', function(){
// 	console.log('btn touched');
// })
// btn.addEventListener('touchend', function(){
// 	console.log('btn leaved');
// })
// btn.addEventListener('touchmove', function(){
// 	console.log('btn leaved');
// })
// btn.addEventListener('touchleave', function(){
// 	console.log('btn moving end');
// })
// btn.addEventListener('touchcancel', function(){
// 	console.log('btn moving cancel');
// })

// tasksContainer.addEventListener('touchstart', (e) => {
//     console.log('touchstart')
//     e.target.closest('li').classList.add('dragging');
// })

// tasksContainer.addEventListener('touchend', (e) => {
//     console.log('touchend')
//     e.target.closest('li').classList.remove('dragging');
// })

// tasksContainer.addEventListener('touchmove', (e) => {
//     e.preventDefault();
//     // console.log('moving')
//     let x = e.touches[0]

//     // console.log(x);

//     const draggedElement = document.querySelector('.dragging');
//     // console.log(draggedElement)
//     const currentElement = e.target;
//     // console.log(currentElement)
    
// })
