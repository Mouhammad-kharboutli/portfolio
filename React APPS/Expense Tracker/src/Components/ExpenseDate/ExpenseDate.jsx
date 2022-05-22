import React from "react";
import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  const { date } = props;
  const day = new Date(date).toLocaleDateString("en-US", { day: "2-digit" });
  const month = new Date(date).toLocaleDateString("en-US", { month: "short" });
  const year = new Date(date).toLocaleDateString("en-US", { year: "numeric" });

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
};

export default ExpenseDate;
