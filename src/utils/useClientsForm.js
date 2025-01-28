import React, { useState } from "react";
import { styled } from "@mui/material/styles";

export function useClientsForm(
  initialFValues,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setValues((prevValues) => ({
        ...prevValues,
        address: {
          ...prevValues.address,
          [field]: value,
        },
      }));
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const StyledForm = styled("form")(({ theme }) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const { children, ...other } = props;
  return (
    <StyledForm autoComplete="off" {...other}>
      {props.children}
    </StyledForm>
  );
}
