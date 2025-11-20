import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AllLoanAppClients } from "../functions/loanApplySlice";
import Title from "../utils/Title";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function BarChart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    async function fetchMostAppliedLoan() {
      try {
        const response = await AllLoanAppClients();
        setChart(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching loan application data:", error);
      }
    }
    fetchMostAppliedLoan();
  }, []);

  const data = {
    labels: chart?.map((x) => x.clientName),
    datasets: [
      {
        label: "Loan clients",
        data: chart?.map((x) => x.loanCount),
        backgroundColor: "#1E90FF",
        borderColor: "#4682B4",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Title>Clients</Title>
      <div
        className="chart-container"
        style={{ position: "relative", height: "40vh" }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
