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
      setLoanedData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetTotalPaidAmountData() {
    try {
      const response = await WeeklyPaidAverage();
      setPaidData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetTotalLoanedAmountData();
    GetTotalPaidAmountData();
  }, []);

  const mergedData = loanedData?.map((loan) => {
    const paid = paidData?.find((payment) => payment.week === loan.week);
    return {
      week: loan.week,
      averageLoanedAmount: loan.averageLoanedAmount,
      averageAmountPaid: paid ? paid.averageAmountPaid : null,
    };
  });

  const data = {
    labels: mergedData?.map((x) => x.week),
    datasets: [
      {
        label: "Loaned Amount",
        data: mergedData?.map((x) => x.averageLoanedAmount),
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.1,
      },
      {
        label: "Paid Amount",
        data: mergedData?.map((x) => x.averageAmountPaid),
        fill: false,
        borderColor: "rgba(34, 139, 34, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 15,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 20000,
            yMax: 20000,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
          },
        },
      },
    },
  };
  return (
    <div>
      <Title>Weekly Loaned vs Paid Amount</Title>
      <div
        className="chart-container"
        style={{ position: "relative", height: "40vh" }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
