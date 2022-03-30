import React from "react";
import "./Chart.css";
import ChartBar from "../ChartBar/ChartBar";

const Chart = (props) => {
  const arrayValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const maximumValue = Math.max(...arrayValues);
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.title}
          value={dataPoint.value}
          maxValue={maximumValue}
          title={dataPoint.title}
        />
      ))}
    </div>
  );
};

export default Chart;
