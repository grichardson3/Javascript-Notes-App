const notes = [
    {
      title: "cote 1",
      content: "test content",
    },
    {
      title: "aote 2",
      content: "test yeet",
    },
    {
      title: "bote 3",
      content: "test content",
    },
  ];

  const filters = {
    searchText: '',
  }

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
      const noteElement = document.createElement('p');
      noteElement.textContent = note.title;
      document.querySelector('#notes').appendChild(noteElement);
    });
  }

  renderNotes(notes, filters);

  document.querySelector('#searchText').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
  });

  document.querySelector('#filterBy').addEventListener('change', (e) => {
    console.log(e.target.value);
  });