import React, { useState, useRef, useEffect } from 'react';
import Note from './Note';
import { Scrollbars } from 'react-custom-scrollbars';

function NoteList({ notes, filter, handleComplete }) {
  const [display, setDisplay] = useState({
    today: false,
    tomorrow: false,
    upcoming: false,
    someday: false
  });

  const [height, setHeight] = useState({
    today: "0",
    tomorrow: "0",
    upcoming: "0",
    someday: "0"
  })

  let todayRef = useRef("0");
  let tomorrowRef = useRef("0");
  let upcomingRef = useRef("0");
  let somedayRef = useRef("0");

  useEffect(() => {
    const newHeight = {...height};
    newHeight.today = todayRef.current ? (display.today ? `${todayRef.current.scrollHeight+1}` : "0") : null;
    newHeight.tomorrow = tomorrowRef.current ? (display.tomorrow ? `${tomorrowRef.current.scrollHeight+1}` : "0") : null;
    newHeight.upcoming = upcomingRef.current ? (display.upcoming ? `${upcomingRef.current.scrollHeight+1}` : "0") : null;
    newHeight.someday = somedayRef.current ? (display.someday ? `${somedayRef.current.scrollHeight+1}` : "0") : null;
    setHeight(newHeight);
  }, [display, notes, filter]);

  let todos = [];
  let noItemsMessage;
  switch (filter) {
    case "all": 
      todos = [...notes];
      noItemsMessage = "You haven't added any items yet..";
      break;
    case "completed":
      todos = notes.filter((note) => note.isCompleted === true);
      noItemsMessage = "No completed tasks.."
      break;
    case "active": 
      todos = notes.filter((note) => note.isCompleted !== true);
      noItemsMessage = "No active tasks.."
      break;
    default: 
      /* no default */
  }

  let todayTodos = todos.filter((todo) => todo.date === "today");
  let tomorrowTodos = todos.filter((todo) => todo.date === "tomorrow");
  let upcomingTodos = todos.filter((todo) => todo.date === "upcoming");
  let somedayTodos = todos.filter((todo) => todo.date === "someday");

  const toggle = (date) => {
    const titles = {...display};
    titles[date] = !display[date];
    setDisplay(titles);
  }

  const createList = () => {
    return (
      <Scrollbars autoHeightMax={`68vh`} autoHeight>
        <div className="note-list">
          {todayTodos.length ?
          <div>
            <h2 onClick={() => toggle("today")}>Today <span className={"amount" + (display["today"] ? " disappeared" : "")}>{todayTodos.length}</span></h2>
              <div id="today" className={"today-todos todos" + (display["today"] ? "" : " collapsed")} ref={todayRef} style={{ maxHeight: `${height.today}px` }}>
              {todayTodos.map((todo) => (
                <Note handleComplete={handleComplete} note={todo} key={todo.id} id={todo.id} />
              ))}
              </div>
          </div>
          : null}
          {tomorrowTodos.length ?
            <div>
              <h2 onClick={() => toggle("tomorrow")}>Tomorrow <span className={"amount" + (display["tomorrow"] ? " disappeared" : "")}>{tomorrowTodos.length}</span></h2>
                <div id="tomorrow" className={"tomorrow-todos todos"  + (display["tomorrow"] ? "" : " collapsed")} ref={tomorrowRef} style={{ maxHeight: `${height.tomorrow}px` }}>
                {tomorrowTodos.map((todo) => (
                  <Note handleComplete={handleComplete} note={todo} key={todo.id} id={todo.id} />
                ))}
                </div>
            </div>
          : null}
          {upcomingTodos.length ?
            <div>
              <h2 onClick={() => toggle("upcoming")}>Upcoming <span className={"amount" + (display["upcoming"] ? " disappeared" : "")}>{upcomingTodos.length}</span></h2>
                <div id="upcoming" className={"upcoming-todos todos" + (display["upcoming"] ? "" : " collapsed")} ref={upcomingRef} style={{ maxHeight: `${height.upcoming}px` }}>
                {upcomingTodos.map((todo) => (
                  <Note handleComplete={handleComplete} note={todo} key={todo.id} id={todo.id} />
                ))}
                </div>
            </div>
          : null}
          {somedayTodos.length ?
            <div>
              <h2 onClick={() => toggle("someday")}>Someday <span className={"amount" + (display["someday"] ? " disappeared" : "")}>{somedayTodos.length}</span></h2>
                <div id="someday" className={"someday-todos todos"  + (display["someday"] ? "" : " collapsed")} ref={somedayRef} style={{ maxHeight: `${height.someday}px` }}>
                {somedayTodos.map((todo) => (
                  <Note handleComplete={handleComplete} note={todo} key={todo.id} id={todo.id} />
                ))}
                </div>
                <div></div>
            </div>
          : null}
        </div>
      </Scrollbars>
    )
  }

  return (
    <div className="list">
      {
        todos.length 
        ? createList()
        : <p>{noItemsMessage}</p>
      }
    </div>
  )
}

export default NoteList;