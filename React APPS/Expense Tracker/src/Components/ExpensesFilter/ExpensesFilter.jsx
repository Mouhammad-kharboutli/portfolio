import React from "react";
import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const clickHandler = (event) => {
    props.onValueChanged(event.target.value);
  };
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter</label>
        <select onClick={clickHandler} defaultValue="2020">
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
