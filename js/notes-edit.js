const titleElement = document.querySelector('#noteTitle');
const bodyElement = document.querySelector('#noteBody');
const removeButton = document.querySelector('#removeNote');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => {
    return note.id == noteId;
});

if (note == undefined) {
    location.assign('/index.html');
}

titleElement.value = note.title;
bodyElement.value = note.body;

console.log(titleElement);

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value;
    note.dateModified = moment().valueOf();
    saveNotes(notes);
});

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value;
    note.dateModified = moment().valueOf();
    saveNotes(notes);
});

removeButton.addEventListener('click', (e) => {
    removeNote(noteId);
    saveNotes(notes);
    location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        console.log(e.newValue);
        note = notes.find((note) => {
            return note.id == noteId;
        });
        
        if (note == undefined) {
            location.assign('/index.html');
        }
        
        titleElement.value = note.title;
        bodyElement.value = note.body;
    }
});