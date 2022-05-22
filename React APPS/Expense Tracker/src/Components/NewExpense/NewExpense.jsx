import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

const NewExpense = (props) => {
  const [isExpenseAdded, setIsExpenseAdded] = useState(false);
  const addExpenseHandler = (newExpense) => {
    const expense = { ...newExpense, id: Math.random() };
    props.onAddNewExpense(expense);
  };
  const isExpenseAddedHandler = () => {
    setIsExpenseAdded(true);
  };
  const addExpense = () => {
    setIsExpenseAdded(false);
  };

  return (
    <div className="new-expense">
      {!isExpenseAdded && (
        <button onClick={isExpenseAddedHandler}> Add Expense </button>
      )}
      {isExpenseAdded && (
        <ExpenseForm
          onAddExpense={addExpenseHandler}
          onIsAdded={isExpenseAddedHandler}
          onCancel={addExpense}
        />
      )}
    </div>
  );
};

export default NewExpense;
