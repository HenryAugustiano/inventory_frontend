import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from 'chart.js/auto'; 
import { Alert } from "react-bootstrap";

const InventoryChart = ({ token }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for the top 5 user items by quantity sold for the month
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/inventory/top5Items`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        const labels = result.data.top5Items.map((item) => item.itemName);
        const dataPoints = result.data.top5Items.map((item) => item.quantitySold);

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Quantity Sold",
              data: dataPoints,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
            {
              label : "Total Sales",
              data : result.data.top5Items.map((item) => item.totalSales),
              backgroundColor: "rgba(192,75,192,0.2)",
              borderColor: "rgba(192,75,192,1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setError(false);
      } catch (error) {
        setError(true);
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      xAxes: [
        {
          type: "category",
          title: {
            display: true,
            text: "Item",
          },
        },
      ],
      yAxes: [
        {
          title: {
            display: true,
          },
        },
      ],
    },
    legend: {
      display: true,
    },
  };

  return (
    <div>
      {error ? (
         <Alert variant="danger" style={{ textAlign: 'center' }}>
          <Alert.Heading>No transaction found for the current month</Alert.Heading>
        </Alert>
      ) : (
        <div>
        {chartData && <Bar data={chartData} options={options} />}
       </div> 
      )}
    </div>
  );
};

export default InventoryChart;
