document.getElementById('saveButton').addEventListener('click', function() {
    const noteText = document.getElementById('note').value;
    if (noteText) {
        addNoteToDOM(noteText, notes.length);
        document.getElementById('note').value = '';

        // Enviar la nota al backend
        fetch('/add_note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note: noteText })
        });
    }
});

// Cargar notas desde el backend
fetch('/get_notes')
    .then(response => response.json())
    .then(data => {
        data.notes.forEach((noteText, index) => {
            addNoteToDOM(noteText, index);
        });
    });

function addNoteToDOM(noteText, index) {
    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = noteText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function() {
        deleteNoteFromDOM(note, index);
    });

    note.appendChild(deleteButton);
    document.getElementById('notesContainer').appendChild(note);
}

function deleteNoteFromDOM(noteElement, index) {
    document.getElementById('notesContainer').removeChild(noteElement);

    // Enviar la solicitud de eliminación al backend
    fetch('/delete_note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index: index })
    });
}
