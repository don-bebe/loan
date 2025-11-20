import React, { useState, useEffect } from "react";
import { MyPaymentCalender } from "../../../functions/loanApplySlice";
import dayjs from "dayjs";
import { Box, Typography, Tooltip } from "@mui/material";
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
            : "orange"; // default color for middle installments

        const label = `Installment ${payment.installmentNumber}`;

        return {
          date: dayjs(payment.dueDate, "YYYY-MM-DD"), // Parse date properly
          color,
          label,
        };
      });

      setHighlightedDates(highlights);
    }
  }, [paymentCalendar]);

  // Render each day with labels and color
  const renderDay = (day, selectedDate, pickersDayProps) => {
    const highlight = highlightedDates.find((h) => h.date.isSame(day, "day"));

    return (
      <Box
        {...pickersDayProps}
        sx={{
          position: "relative",
          backgroundColor: highlight ? highlight.color : "transparent",
          borderRadius: "50%",
          color: highlight ? "white" : "inherit",
          boxShadow: highlight ? "0px 0px 4px rgba(0,0,0,0.2)" : "none",
        }}
      >
        {highlight && (
          <Tooltip title={highlight.label} arrow>
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            >
              {highlight.label}
            </Typography>
          </Tooltip>
        )}
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
        renderDay={renderDay}
        shouldDisableDate={(date) => !highlightedDates.some((h) => h.date.isSame(date, "day"))}
      />
    </LocalizationProvider>
  );
}
