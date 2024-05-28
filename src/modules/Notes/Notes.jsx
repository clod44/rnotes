import Note from './Note';

function Notes({ notes, deleteNote, currentEditNote, setCurrentEditNote }) {
    return (
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {notes.map((note, index) => (
                <Note key={index} note={note} deleteNote={deleteNote} currentEditNote={currentEditNote} setCurrentEditNote={setCurrentEditNote} />
            ))}
        </div>
    );
}

export default Notes;
