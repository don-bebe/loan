import React, { useState, useEffect } from "react";
import { WeeklyLoanedAverage } from "../functions/loanApplySlice";
import { WeeklyPaidAverage } from "../functions/paymentSlice";
import Title from "../utils/Title";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin
);

export default function WeeklyLineChart() {
  const [loanedData, setLoanedData] = useState([]);
  const [paidData, setPaidData] = useState([]);

  async function GetTotalLoanedAmountData() {
    try {
      const response = await WeeklyLoanedAverage();
      setLoanedData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetTotalPaidAmountData() {
    try {
      const response = await WeeklyPaidAverage();
      setPaidData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetTotalLoanedAmountData();
    GetTotalPaidAmountData();
  }, []);

  // Get unique weeks from both datasets
  const allWeeks = Array.from(
    new Set([...loanedData.map((d) => d.week), ...paidData.map((d) => d.week)])
  ).sort();

  // Merge data, ensuring all weeks are included
  const mergedData = allWeeks.map((week) => {
    const loan = loanedData.find((l) => l.week === week) || {};
    const paid = paidData.find((p) => p.week === week) || {};
    return {
      week,
      averageLoanedAmount: loan.averageLoanedAmount || 0,
      averageAmountPaid: paid.averageAmountPaid || 0,
    };
  });

  const allValues = mergedData.flatMap((d) => [d.averageLoanedAmount, d.averageAmountPaid]);
  const maxY = Math.max(...allValues) || 0;
  const buffer = maxY * 0.1; // Add some buffer space

  const data = {
    labels: mergedData.map((x) => x.week),
    datasets: [
      {
        label: "Loaned Amount",
        data: mergedData.map((x) => x.averageLoanedAmount),
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.1,
      },
      {
        label: "Paid Amount",
        data: mergedData.map((x) => x.averageAmountPaid),
        fill: false,
        borderColor: "rgba(34, 139, 34, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: maxY - buffer, // Adjusted dynamically
            yMax: maxY - buffer,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        min: 0, // Ensure it starts from zero
        max: maxY + buffer,
      },
    },
  };

  return (
    <div>
      <Title>Weekly Loaned vs Paid Amount</Title>
      <div className="chart-container" style={{ position: "relative", height: "40vh" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
