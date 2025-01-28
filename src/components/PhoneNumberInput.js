import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useTheme } from "@mui/material/styles";

export default function PhoneNumberInput(props) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <PhoneInput
      label={label}
      name={name}
      country={"zw"}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
      inputStyle={{
        width: "80%",
        margin: "8px 0",
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        borderColor: isDarkMode ? "#666" : "#ccc",
      }}
      buttonStyle={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
      }}
    />
  );
}
