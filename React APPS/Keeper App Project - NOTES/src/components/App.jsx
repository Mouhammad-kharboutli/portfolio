import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import uuid from "react-uuid";

function App() {
  // const [notes, setNotes] = useState([{ title: "hello", content: "world" }]);
  const [notes, setNotes] = useState([]);
  function addNote(note) {
    // console.log("addNote called");
    setNotes((prevValues) => {
      return [...prevValues, note];
    });
  }
  function deleteNote(id) {
    // console.log("Delete function called");
    setNotes((prevValues) => {
      return prevValues.filter((item, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={uuid()}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
