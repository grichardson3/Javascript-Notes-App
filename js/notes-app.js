const titleElement = document.querySelector('#noteTitle');
const bodyElement = document.querySelector('#noteBody');
const removeButton = document.querySelector('#removeNote');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();

const filters = {
  searchText: '',
}

renderNotes(notes, filters);

document.querySelector('#nameForm').addEventListener('submit', (e) => {
  const noteID = uuidv4();
  e.preventDefault();
  if (!e.target.elements.notesInput.value == "") {
    notes.push({
      id: noteID,
      title: e.target.elements.notesInput.value,
      body: ''
    });
  }
  saveNotes(notes);
    // renderNotes(notes, filters);
  e.target.elements.notesInput.value = "";
  location.assign(`/edit.html#${noteID}`);
});

document.querySelector('#searchText').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#filterBy').addEventListener('change', (e) => {
  console.log(e.target.value);
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});

/*const now = new Date();
console.log(now.toString());
console.log(`Year: ${now.getFullYear()}`);
console.log(`Month: ${now.getMonth() + 1}`);
console.log(`Day: ${now.getDate()}`);*/