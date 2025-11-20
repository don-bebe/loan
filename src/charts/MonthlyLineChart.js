import React, { useState, useEffect } from "react";
import { MonthlyLoanedAverage } from "../functions/loanApplySlice";
import { MonthlyPaidAverage } from "../functions/paymentSlice";
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

export default function MonthlyLineChart() {
  const [loanedData, setLoanedData] = useState([]);
  const [paidData, setPaidData] = useState([]);

  async function GetTotalLoanedAmountData() {
    try {
      const response = await MonthlyLoanedAverage();
      setLoanedData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetTotalPaidAmountData() {
    try {
      const response = await MonthlyPaidAverage();
      setPaidData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetTotalLoanedAmountData();
    GetTotalPaidAmountData();
  }, []);

  // Get unique months from both datasets
  const allMonths = Array.from(
    new Set([...loanedData.map((d) => d.month), ...paidData.map((d) => d.month)])
  ).sort();

  // Merge data, ensuring all months are included
  const mergedData = allMonths.map((month) => {
    const loan = loanedData.find((l) => l.month === month) || {};
    const paid = paidData.find((p) => p.month === month) || {};
    return {
      month,
      averageLoanedAmount: loan.averageLoanedAmount || 0,
      averageAmountPaid: paid.averageAmountPaid || 0,
    };
  });

  const allValues = mergedData.flatMap((d) => [d.averageLoanedAmount, d.averageAmountPaid]);
  const minY = Math.min(...allValues, 0); // Ensure it starts from zero
  const maxY = Math.max(...allValues) || 0;
  const buffer = (maxY - minY) * 0.1; // Add some buffer space

  const data = {
    labels: mergedData.map((x) => x.month),
    datasets: [
      {
        label: "Loaned Amount",
        data: mergedData.map((x) => x.averageLoanedAmount),
        fill: false,
        borderColor: "rgba(0, 0, 139, 1)",
        tension: 0.1,
      },
      {
        label: "Paid Amount",
        data: mergedData.map((x) => x.averageAmountPaid),
        fill: false,
        borderColor: "rgba(0, 100, 0, 1)",
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
        min: 0, // Start from zero
        max: maxY + buffer,
      },
    },
  };

  return (
    <div>
      <Title>Monthly Loaned vs Paid Amount</Title>
      <div className="chart-container" style={{ position: "relative", height: "40vh" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
