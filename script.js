const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richiestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

// Store listItems
const listItems = [];

let dragStartIndex;

createList();

// Insert List items into DOM
function createList() {
  [...richiestPeople] // ... means copy the list (spread operator)
  .map(a => ({value: a, sort:Math.random()})) // map take array and allow us to create a new array of objects {a=name, sort=random decimal based on which they will be sorterted (in this case randomly)}
  .sort((a,b) => a.sort - b.sort) // sort them based on asc based on sort value
  .map(a => a.value) // map them back to the array of strings (values=names)
  .forEach((person, index) => {
      const listItem = document.createElement('li');


      listItem.setAttribute('data-index', index); // add to custom attribute data-index value of index 

      listItem.innerHTML = `
        <span class="number">${index + 1}</span> 
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      // Pushing each created item to the arrah of list items ()
      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

// Drag and Drop https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = this.closest('li').getAttribute('data-index');

}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');

  
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = this.getAttribute('data-index');
  // swap indexes
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over')
}

// Swap indexes
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });

}

