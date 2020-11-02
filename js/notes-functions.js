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
  const pb = document.createElement('br');
  const textElement = document.createElement('a');
  const dateCreatedTextElement = document.createElement('small');
  const dateModifiedTextElement = document.createElement('small');
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
    dateCreatedTextElement.textContent = `Created At: ${moment(note.createdAt).format("MMMM Do, YYYY H:mm:ss a")}`;
    dateModifiedTextElement.textContent = `Date Modified: ${moment(note.dateModified).format("MMMM Do, YYYY H:mm:ss a")}`;
  } else {
    textElement.textContent = "Unnamed note";
  }

  textElement.setAttribute('href', `/edit.html#${note.id}`);
  noteElement.appendChild(textElement);
  noteElement.appendChild(pb);
  noteElement.appendChild(dateCreatedTextElement);
  noteElement.appendChild(pb);
  noteElement.appendChild(dateModifiedTextElement);

  return noteElement;
}

const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => {
      if (a.dateModified > b.dateModified) {
        return -1;
      } else if (a.dateModified < b.dateModified) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  }else if (sortBy === 'byAlphabetical') {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
}

  // Render application notes

  const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy);
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