document.getElementById('saveButton').addEventListener('click', function() {
    const noteText = document.getElementById('note').value;
    if (noteText) {
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = noteText;
        document.getElementById('notesContainer').appendChild(note);
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
        data.notes.forEach(noteText => {
            const note = document.createElement('div');
            note.className = 'note';
            note.textContent = noteText;
            document.getElementById('notesContainer').appendChild(note);
        });
    });
