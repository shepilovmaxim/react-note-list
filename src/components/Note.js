import React from 'react';

function Note({ note, id, handleComplete }) {
  return (
    <div className={"note" + (note.isCompleted ? " completed" : '')}>
      {note.text}
      <button onClick={() => handleComplete(id)} className="complete-button button">{note.isCompleted ? <span>&#8634;</span> : <span>&#10003;</span>}</button>
    </div>
  );
}

export default Note;