import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const InventoryChart = () => {
  // Mock data for demonstration
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Inventory Trends",
        data: [10, 15, 7, 22, 18, 25],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantity",
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default InventoryChart;
