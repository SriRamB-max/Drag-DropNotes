import React, { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [draggedNoteIndex, setDraggedNoteIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedNoteIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedNoteIndex === null) return;
    const newNotes = [...notes];
    const draggedNote = newNotes.splice(draggedNoteIndex, 1)[0];
    newNotes.splice(index, 0, draggedNote);
    setNotes(newNotes);
    setDraggedNoteIndex(null);
  };

  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    setNotes([...notes, { text: newNote, isEditing: false }]);
    setNewNote("");
  };

  const handleEditToggle = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].isEditing = !updatedNotes[index].isEditing;
    setNotes(updatedNotes);
  };

  const handleEditChange = (index, newText) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = newText;
    setNotes(updatedNotes);
  };

  const handleSave = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].isEditing = false;
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <h2>Drag and Drop Notes</h2>

      {/* Input to add note */}
      <div className="input-container">
        <input
          type="text"
          id="Add"
          placeholder="Enter a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <label htmlFor="Add">
          <button onClick={handleAddNote} className="btn">Add Note</button>
        </label>
      </div>

      <div className="notes-container">
        {notes.map((note, index) => (
          <div
            key={index}
            className="note"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            {note.isEditing ? (
              <>
                <input
                  type="text"
                  value={note.text}
                  onChange={(e) => handleEditChange(index, e.target.value)}
                />
                <button onClick={() => handleSave(index)} className="btn-e">Save</button>
              </>
            ) : (
              <>
                <span>{note.text}</span>
                <button onClick={() => handleEditToggle(index)} className="btn-e">Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
