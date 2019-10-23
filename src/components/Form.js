import React, { useState } from 'react';
import shortid from 'shortid';

function Form({ addNote }) {
  const [value, setValue] = useState('');
  const [date, setDate] = useState('today');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addNote({
      id: shortid.generate(),
      text: value,
      date: date
    });
    setValue('');
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-row">
      <input onChange={e => setValue(e.target.value)} value={value} className="add-input" type="text" placeholder="Type a new item here..."/>
      <select onChange={e => setDate(e.target.value)} className="select-date">
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="upcoming">Upcoming</option>
        <option value="someday">Someday</option>
      </select>
      </div>
      <button className="add-button button">Add</button>
    </form>
  );
}

export default Form;