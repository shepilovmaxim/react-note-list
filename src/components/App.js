import React, { useState, useEffect } from 'react';
import NoteList from './NoteList'
import Form from './Form';
import '../styles/App.css';

function App() {
  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.notes = JSON.stringify(notes);
  })

  const addNote = (todo) => {
    const newNotes = [...notes, {text: todo.text, id: todo.id, date: todo.date, isCompleted: false}];
    setNotes(newNotes);
  };

  const handleComplete = (id) => {
    const newNotes = [...notes];
    const index = newNotes.findIndex(todo => todo.id === id);
    if (newNotes[index].isCompleted) {
      newNotes[index].isCompleted = false;
      setNotes(newNotes);
    } else {
      newNotes[index].isCompleted = true;
      setNotes(newNotes);
    }
  }

  const isActive = (value) => {
    return value === filter ? "active-filter" : null;
  }

  const deleteCompleted = () => {
    const allNotes = [...notes];
    const filteredNotes = allNotes.filter((note) => note.isCompleted !== true);
    setNotes(filteredNotes);
  }

  return (
    <div className="todo">
      <h1>To do.</h1>
      <ul className="filters" onClick={(e) => setFilter(e.target.dataset.value)}>
        <li data-value="all" className={isActive("all")}>All</li>
        <li data-value="completed" className={isActive("completed")}>Completed</li>
        <li data-value="active" className={isActive("active")}>Active</li>
      </ul>
      <button className="delete-button button" onClick={deleteCompleted}>Delete completed</button>
      <NoteList notes={notes} filter={filter} handleComplete={handleComplete}/>
      <Form addNote={addNote} /> 
    </div>
  );
}

export default App;