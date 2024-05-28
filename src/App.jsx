import { useState, useEffect } from 'react';
import './App.css';
import Nav from './modules/Nav/Nav.jsx';
import Editor from './modules/Editor/Editor.jsx';
import Notes from './modules/Notes/Notes.jsx';
import { v4 as uuid } from 'uuid';

function App() {
    const [notes, setNotes] = useState([]);
    const [currentEditNote, setCurrentEditNote] = useState(null);

    useEffect(() => {
        generateExampleNotes();
        // This will be triggered twice because of the React strict mode. It mounts twice.
    }, []);
    const generateExampleNotes = () => {
        for (let i = 0; i < 4; i++) {
            const note = {
                title: `Note ${i + 1}`,
                text: `Text ${i + 1}`,
            };
            addNote(note);
        }
    };

    const addNote = (note) => {
        const id = uuid();
        const createDate = new Date();
        const lastUpdateDate = new Date();
        setNotes((n) => [...n, { ...note, id, createDate, lastUpdateDate }]);
        setCurrentEditNote(null);
    };
    const deleteNote = (id) => {
        setNotes((n) => n.filter((note) => note.id !== id));
    };

    const saveNote = (note) => {
        const existingNote = notes.find((n) => n.id === note.id);
        if (!existingNote) {
            alert("Note not found! Add it as a new note instead.");
            return;
        }
        setNotes((n) =>
            n.map((n) => (n.id !== note.id ? n : { ...n, ...note }))
        );
    };
    const getCurrentEditNote = () => {
        return currentEditNote;
    };

    return (
        <>
            <Nav />
            <Editor addNote={addNote} saveNote={saveNote} currentEditNote={currentEditNote} setCurrentEditNote={setCurrentEditNote} />
            <br />
            <Notes notes={notes} deleteNote={deleteNote} currentEditNote={currentEditNote} setCurrentEditNote={setCurrentEditNote} />
        </>
    );
}

export default App;
