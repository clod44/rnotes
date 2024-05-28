import { useState, useEffect } from 'react';

function Editor({ addNote, saveNote, currentEditNote }) {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [lastUpdateDate, setLastUpdateDate] = useState(new Date());

    useEffect(() => {
        if (currentEditNote != null) {
            setId(currentEditNote.id);
            setTitle(currentEditNote.title);
            setText(currentEditNote.text);
            setLastUpdateDate(currentEditNote.lastUpdateDate);
        } else {
            setId('');
            setTitle('');
            setText('');
            setLastUpdateDate(new Date());
        }
    }, [currentEditNote]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setLastUpdateDate(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleAddNote = () => {
        if ((title + text).trim()) {
            const note = {
                title: title.trim(),
                text: text.trim(),
            };
            addNote(note);
        }
    };

    const handleSaveNote = () => {
        if ((title + text).trim().length < 1 && !id) {
            alert('nothing to save');
        } else {
            const editedNote = {
                id: id,
                title: title.trim(),
                text: text.trim(),
                lastUpdateDate: lastUpdateDate,
            };
            saveNote(editedNote);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="form-control">
                    <div className="label flex-wrap align-middle justify-between gap-2">
                        <span className="label-text text-xs">{lastUpdateDate.toLocaleString()}</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSaveNote}
                                className="btn btn-xs btn-primary"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleAddNote}
                                className="btn btn-xs btn-primary"
                            >
                                Add Note
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </div>
                </label>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text"></span>
                    </div>
                    <textarea
                        className="textarea textarea-bordered"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Text"
                    />
                </label>
            </form>
        </div>
    );
}

export default Editor;
