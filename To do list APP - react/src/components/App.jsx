import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newItem = event.target.value;
    setInputText(newItem);
    console.log(inputText);
  }
  function handleSubmit() {
    setItems((prevValue) => {
      return [...prevValue, inputText];
    });
    setInputText("");
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleChange} value={inputText} />
        <button type="submit" onClick={handleSubmit}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item) => {
            return <li> {item} </li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
