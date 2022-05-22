import React, { useState } from "react";
import Expenses from "./Components/Expenses/Expenses";
import NewExpense from "./Components/NewExpense/NewExpense";
function App() {
  const DUMMY_EXPENSES = [
    {
      id: 1,
      title: "Car insurance",
      date: "2021-01-22",
      amount: 110,
    },
    {
      id: 2,
      title: "Car subscription",
      date: "2022-02-02",
      amount: 399,
    },
    {
      id: 3,
      title: "Wash and Clean",
      date: "2019-04-05",
      amount: 50,
    },
    { id: 4, title: "Diesel", date: "2021-09-30", amount: 200 },
  ];
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const AddNewExpenseHandler = (expense) => {
    console.log(expense);
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <h2>Let's get started!</h2>
      <NewExpense onAddNewExpense={AddNewExpenseHandler} />
      <Expenses onAddedExpense={AddNewExpenseHandler} items={expenses} />
    </div>
  );
}

export default App;
