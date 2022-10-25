# Frontend Mentor - TODO app solution

This is my solution to the [REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca)

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Bonus: Drag and drop to reorder items on the list

### Screenshot

![](./images/screenshots/screenshots.jpg)

### Links

- Solution URL: [GitHub](https://github.com/userMatMik/TODO_FM)
- Live Site URL: [Live Site URL](https://beautiful-shortbread-20e676.netlify.app/)

## My process

### Built with

- SCSS
  - Flexbox
  - CSS Grid
- Vanilla JavaScript
  - JS Modules
  - localStorage
- [SortableJS](https://sortablejs.github.io/Sortable/) - JS library for reorderable drag-and-drop

### What I learned

This project wasn't to hard to finish, but it had few tricky challenges. The first one was to create linear gradient in checkbox border and and background. The second one was drag-and-drop funcionality.

At first I wrote my own drag-and-drop funcionality. I learned how to use events such as dragstart, dragend and dragover. (You can check my code below.) It works fine on desktop but it didnt work on mobile. I read that drag-and-drop API over all not working on mobile browsers so I've decided that I will use sortableJS library and I was really impresed how fast you can create drag-and-drop funcionality with it.

I think my main lesson from this project was that I should use libraries way more often. There is no need to invent a wheel from the beginning :)


```js
import { tasksContainer } from "./app.js";
import { tasksArray } from "./app.js";
import { updateLocalStorage } from "./app.js";

tasksContainer.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragging');
})

tasksContainer.addEventListener('dragend',(e) => {
    const draggedElement = document.querySelector('.dragging');
    const draggedElementID = draggedElement.getAttribute('id');
    
    const taskToIndex = [...document.querySelectorAll('.task')].findIndex((task) => task.getAttribute('id') === draggedElement.getAttribute('id'))

    const taskToUpdate = tasksArray.findIndex((task) => task.id == draggedElementID);

    let cuttedElement = tasksArray.splice(taskToUpdate, 1)[0]
    tasksArray.splice(taskToIndex, 0, cuttedElement)

    updateLocalStorage();

    e.target.classList.remove('dragging');
} )

tasksContainer.addEventListener('dragover', (e) => {
    e.preventDefault();

    const draggedElement = document.querySelector('.dragging');
    const currentElement = e.target;

    const canSort = draggedElement !== currentElement && currentElement.classList.contains('task');
    if (!canSort) { return; }

    const nextElement = getNextElement(e.clientY, currentElement);

    if (nextElement && draggedElement === nextElement.previousElementSibling || draggedElement === nextElement) {
        return;
    }

    tasksContainer.insertBefore(draggedElement, nextElement);

})  

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoordinates = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoordinates.y + currentElementCoordinates.height / 2;

    return (cursorPosition < currentElementCenter) ? currentElement : currentElement.nextElementSibling;
}
```
## Author

- Website - [Mateusz M](https://github.com/userMatMi)
- Frontend Mentor - [@userMatMik](https://www.frontendmentor.io/profile/userMatMik)
