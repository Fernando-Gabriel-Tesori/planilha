document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteTime = document.getElementById('note-time');
    const noteText = document.getElementById('note-text');
    const noteList = document.getElementById('note-list');

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const time = noteTime.value;
        const text = noteText.value;

        addNoteToList(time, text);
        saveNoteToStorage(time, text);

        noteTime.value = '';
        noteText.value = '';
    });

    function addNoteToList(time, text) {
        const li = document.createElement('li');
        li.textContent = `${time} - ${text}`;
        noteList.appendChild(li);
    }

    function saveNoteToStorage(time, text) {
        const notes = getNotesFromStorage();
        notes.push({ time, text });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function getNotesFromStorage() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    function loadNotes() {
        const notes = getNotesFromStorage();
        notes.forEach(note => addNoteToList(note.time, note.text));
    }

    loadNotes();
});
