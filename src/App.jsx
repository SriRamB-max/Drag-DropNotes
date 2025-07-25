import React, { useState } from "react";
import "./App.css";
import deleteIcon from "./assets/deleteIcon.jpg"
function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(""); // for input text
  const [draggedNoteIndex, setDraggedNoteIndex] = useState(null);

  // Handle drag start
  const handleDragStart = (index) => {
    setDraggedNoteIndex(index);
  };

  // Handle drop
  const handleDrop = (index) => {
    if (draggedNoteIndex === null) return;

    const newNotes = [...notes];
    const draggedNote = newNotes.splice(draggedNoteIndex, 1)[0]; // remove dragged
    newNotes.splice(index, 0, draggedNote); // insert at new index
    setNotes(newNotes);
    setDraggedNoteIndex(null);
  };

  // Handle adding a new note
  const handleAddNote = () => {
    if (newNote.trim() === "") return; // avoid empty notes
    setNotes([...notes, newNote]);
    setNewNote(""); // clear input
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
        {/* <button className="delete"><img src={deleteIcon} alt="" /></button> */}
        
      </div>

      <div className="notes-container">
        {notes.map((note, index) => (
          <div
            key={index}
            className="note"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()} // required for drop
            onDrop={() => handleDrop(index)}
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
