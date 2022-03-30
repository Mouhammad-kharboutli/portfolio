import React, { useState } from "react";
import "./Expenses.css";
import Card from "../Card/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesChart from "../ChartComponent/ExpensesChart";

const Expenses = (props) => {
  const [changedValue, setChangedValue] = useState("2020");

  const valueChangeHandler = (value) => {
    setChangedValue(value);
  };

  const filteredExpenses = props.items.filter(
    (expense) => new Date(expense.date).getFullYear() === parseInt(changedValue)
  );

  return (
    <Card className="expenses">
      <ExpensesFilter onValueChanged={valueChangeHandler} />
      <ExpensesChart chartData={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
};

export default Expenses;
