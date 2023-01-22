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

      listItem.setAttribute('data-index', index);

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
    })
}