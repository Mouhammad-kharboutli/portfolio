import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={note.title}
          placeholder="Title"
          onChange={handleChange}
        />
        {/* value=note.title */}
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        {/* value=note.content */}
        <button
          onClick={() => {
            props.onAdd(note);
            setNote({ title: "", content: "" });
          }}
          type="submit"
        >
          Add
        </button>
      </form>
      {/* <div className="note">
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <button>DELETE</button>
      </div> */}
    </div>
  );
}

export default CreateArea;
