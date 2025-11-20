import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { AllLoanAppType } from "../functions/loanApplySlice";
import Title from "../utils/Title";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    async function fetchMostAppliedLoan() {
      try {
        const response = await AllLoanAppType();
        setChart(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching loan application data:", error);
      }
    }
    fetchMostAppliedLoan();
  }, []);

  const data = {
    labels: chart?.map((x) => x.loanType),
    datasets: [
      {
        label: "Loan Packages",
        data: chart?.map((x) => x.loanCount),
        backgroundColor: [
          "#1E90FF",
          "#4682B4",
          "#5F9EA0",
          "#6495ED",
          "#00BFFF",
          "#87CEFA",
          "#B0C4DE",
          "#ADD8E6",
          "#4682B4",
          "#5F9EA0",
          "#1E90FF",
          "#6495ED",
          "#87CEEB",
          "#00BFFF",
          "#B0C4DE",
        ],
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Title>Most Applied Packages</Title>
      <div
        className="chart-container"
        style={{ position: "relative", height: "40vh" }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}