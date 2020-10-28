// Read existing notes from local storage

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    if (notesJSON !== null) {
      return JSON.parse(notesJSON);
    } else {
        return [];
    }
}

// Save a note to the list

const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Remove a note from the list

const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
}

// Generate the DOM structure for a note

const generateNoteDOM = (note) => {
  const noteElement = document.createElement('div');
  const textElement = document.createElement('a');
  const deleteButton = document.createElement('button');

  deleteButton.textContent = "Delete";
  noteElement.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Unnamed note";
  }

  textElement.setAttribute('href', `/edit.html#${note.id}`);
  noteElement.appendChild(textElement);

  return noteElement;
}

  // Render application notes

  const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });
    if (!filteredNotes.length) {
      document.querySelector('#notes').innerHTML = '<p><i style="color: #666;">no results found...</i></p>';
    } else {
      document.querySelector('#notes').innerHTML = '';
    }
    filteredNotes.forEach((note) => {
      const noteElement = generateNoteDOM(note);
      document.querySelector('#notes').appendChild(noteElement);
    });
  }