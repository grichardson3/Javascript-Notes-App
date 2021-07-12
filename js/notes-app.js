const container = document.querySelector("#container");
const titleElement = document.querySelector('#noteTitle');
const bodyElement = document.querySelector('#noteBody');
const removeButton = document.querySelector('#removeNote');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();

document.body.style.height = window.innerHeight + "px";
container.style.height = window.clientHeight + "px";

window.addEventListener("resize", function(){
  document.body.style.height = window.innerHeight + "px";
});

window.addEventListener("resize", function(){
  container.style.height = window.clientHeight + "px";
});

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