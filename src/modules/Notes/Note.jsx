import React, { useState, useEffect } from 'react';

function Note({ note, deleteNote, currentEditNote, setCurrentEditNote }) {
    const [selected, setSelected] = useState(false);

    const handleDeleteNote = () => {
        deleteNote(note.id);
    };

    const handleEditNote = () => {
        setCurrentEditNote(note);
    };

    useEffect(() => {
        if (currentEditNote && currentEditNote.id === note.id) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [currentEditNote]);

    return (
        <div className="shadow border-0 border-primary border-b-2 border-e-2 border-1 rounded p-0 text-start cursor-pointer duration-300 active:scale-95">
            <div className={selected ? 'bg-base-300' : 'bg-base-100'}>

                <div className="flex justify-between flex-wrap align-middle">
                    <button className="btn btn-xs btn-ghost">
                        {note.title}
                    </button>
                    <div className="flex flex-nowrap align-middle justify-center gap-0">
                        <button className="btn btn-xs btn-ghost">
                            {note.createDate.toLocaleString()}
                        </button>
                        <button className="btn btn-xs hover:btn-error" onClick={handleDeleteNote}>
                            🗑️
                        </button>
                        <button className="btn btn-xs hover:btn-warning" onClick={handleEditNote}>
                            ✏️
                        </button>
                    </div>
                </div>
                <p className='p-2 pt-0'>{note.text}</p>

            </div>
        </div>
    );
}

export default Note;
