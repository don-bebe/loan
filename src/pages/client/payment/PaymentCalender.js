import React, { useState, useEffect } from "react";
import { MyPaymentCalender } from "../../../functions/loanApplySlice";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function PaymentCalender() {
  const [paymentCalendar, setPaymentCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);

  // Fetch calendar data
  useEffect(() => {
    async function fetchCalender() {
      try {
        const response = await MyPaymentCalender();
        const data = response.data?.paymentCalendar || [];
        setPaymentCalendar(data);
      } catch (error) {
        console.error("Error fetching payment calendar:", error);
        setPaymentCalendar([]);
      }
    }

    fetchCalender();
  }, []);

  // Highlight logic
  useEffect(() => {
    if (Array.isArray(paymentCalendar)) {
      const highlights = paymentCalendar.map((payment) => {
        const color =
          payment.installmentNumber === 1
            ? "green"
            : payment.installmentNumber === paymentCalendar.length
            ? "blue"
            : "orange";

        const label =
          payment.installmentNumber === 1
            ? "First Installment"
            : payment.installmentNumber === paymentCalendar.length
            ? "Final Installment"
            : `Installment ${payment.installmentNumber}`;

        return {
          date: dayjs(payment.dueDate, "YYYY-MM-DD"), // Parse date properly
          color,
          label,
        };
      });

      setHighlightedDates(highlights);
    }
  }, [paymentCalendar]);

  // Render each day
  const renderDay = (day, selectedDate, pickersDayProps) => {
    const highlight = highlightedDates.find((h) => h.date.isSame(day, "day"));

    return (
      <Box
        {...pickersDayProps}
        sx={{
          position: "relative",
          backgroundColor: highlight ? highlight.color : "inherit",
          color: highlight ? "white" : "inherit",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: highlight ? highlight.color : "lightgray",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "40px",
          width: "40px",
        }}
      >
        <Typography variant="body2">{day.date()}</Typography>
        {highlight && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: "-10px",
              fontSize: "0.6rem",
              color: "black",
            }}
          >
            {highlight.label}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 2 }}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderDay={renderDay}
        />
      </Box>
    </LocalizationProvider>
  );
}