const titleElement = document.querySelector('#noteTitle');
const bodyElement = document.querySelector('#noteBody');
const removeButton = document.querySelector('#removeNote');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();

console.log(moment().toString());

const filters = {
  // default values
  searchText: '',
  sortBy: 'byEdited',
}

renderNotes(notes, filters);

document.querySelector('#nameForm').addEventListener('submit', (e) => {
  const noteID = uuidv4();
  const timestamp = moment().valueOf();
  e.preventDefault();
  if (!e.target.elements.notesInput.value == "") {
    notes.push({
      id: noteID,
      title: e.target.elements.notesInput.value,
      createdAt: timestamp,
      dateModified: timestamp,
      body: ''
    });
    saveNotes(notes);
    renderNotes(notes, filters);
    e.target.elements.notesInput.value = "";
    // location.assign(`/edit.html#${noteID}`);
  }
});

document.querySelector('#searchText').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#filterBy').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderNotes(notes, filters);
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});