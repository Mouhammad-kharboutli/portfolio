import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const newExpense = {
      title: title,
      amount: +amount,
      date: new Date(date),
    };
    if (
      newExpense.amount !== "" &&
      newExpense.title !== "" &&
      newExpense.date !== ""
    ) {
      props.onAddExpense(newExpense);
      setTitle("");
      setAmount("");
      setDate("");
      props.onCancel();
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} value={title} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            value={date}
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
          />
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit"> Add Expense</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
