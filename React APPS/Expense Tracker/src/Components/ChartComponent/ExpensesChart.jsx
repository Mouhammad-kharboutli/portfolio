import React from "react";
import Chart from "./Chart/Chart";

const ExpensesChart = (props) => {
  const dataPoints = [
    { title: "Jan", value: 0 },
    { title: "Feb", value: 0 },
    { title: "Mar", value: 0 },
    { title: "Apr", value: 0 },
    { title: "May", value: 0 },
    { title: "Jun", value: 0 },
    { title: "Jul", value: 0 },
    { title: "Aug", value: 0 },
    { title: "Sep", value: 0 },
    { title: "Oct", value: 0 },
    { title: "Nov", value: 0 },
    { title: "Dec", value: 0 },
  ];

  for (const expense of props.chartData) {
    const expenseMonth = new Date(expense.date).getMonth(); // starting from 0 => january == 0
    dataPoints[expenseMonth].value += expense.amount;
  }

  return (
    <div>
      <Chart dataPoints={dataPoints} />
    </div>
  );
};

export default ExpensesChart;
