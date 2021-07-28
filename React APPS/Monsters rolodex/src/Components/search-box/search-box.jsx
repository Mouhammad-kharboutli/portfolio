import React from "react";
import "./search-box.css";

export const SearchBox = (props) => {
  return (
    <div className="search">
      <input placeholder={props.placeholder} onChange={props.handleChange} />
    </div>
  );
};
