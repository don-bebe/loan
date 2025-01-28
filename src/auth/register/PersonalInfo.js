import React, { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import MultiFormContext from "../../utils/MultiFormContext";
import Title from "../../utils/Title";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(1),
}));

export default function PersonalInfo() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const {
    handleBack,
    handleNext,
    title,
    isIndividual,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    setDOB,
    dateOfBirth,
    emailAddress,
    setEmail,
    gender,
    setGender,
    ID_number,
    setID,
    businessName,
    setName,
    contactPerson,
    setContactPerson,
    registrationNumber,
    setRegNum,
    phoneNumber,
    setPhone,
    companyPhone,
    setCompanyPhone,
  } = useContext(MultiFormContext);

  const handleInputChange = (value) => {
    setPhone(value);
  };

  const isValidDOB = () => {
    if (!dateOfBirth) return false;
    const inputDate = new Date(dateOfBirth);
    const today = new Date();
    const minDate = new Date(today.setFullYear(today.getFullYear() - 20));
    return inputDate <= minDate;
  };

  const isNextEnabled = isIndividual
    ? firstName &&
      lastName &&
      dateOfBirth &&
      isValidDOB() && 
      emailAddress &&
      phoneNumber &&
      ID_number
    : businessName &&
      registrationNumber &&
      emailAddress &&
      phoneNumber &&
      companyPhone &&
      contactPerson;

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <div style={{ marginLeft: 20 }}>
        <Grid container spacing={2}>
          {isIndividual ? (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  variant="outlined"
                  id="firstName"
                  name="firstName"
                  label="First name"
                  sx={{ margin: (theme) => theme.spacing(1), width: "75%" }}
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                  required
                />
                <TextField
                  variant="outlined"
                  sx={{ margin: (theme) => theme.spacing(1), width: "75%" }}
                  id="ID_number"
                  name="ID_number"
                  label="ID Number"
                  type="text"
                  value={ID_number}
                  onChange={(e) => setID(e.target.value)}
                  required
                />
                <FormControl
                  component="fieldset"
                  sx={{ margin: (theme) => theme.spacing(1), width: "75%" }}
                >
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel
                      value="m"
                      control={<Radio />}
                      label="Male"
                      sx={{ mr: 1 }}
                    />
                    <FormControlLabel
                      value="f"
                      control={<Radio />}
                      label="Female"
                      sx={{ mr: 1 }}
                    />
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  variant="outlined"
                  sx={{ margin: (theme) => theme.spacing(1), width: "75%" }}
                  type="text"
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <TextField
                  variant="outlined"
                  sx={{ margin: (theme) => theme.spacing(1), width: "75%" }}
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => {
                    const inputDate = new Date(e.target.value);
                    const today = new Date();
                    const minDate = new Date(
                      today.setFullYear(today.getFullYear() - 20)
                    );

                    if (inputDate <= minDate) {
                      setDOB(e.target.value); // Accept the input only if it meets the condition
                    } else {
                      alert("You must be at least 20 years old.");
                    }
                  }}
                  required
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  variant="outlined"
                  id="businessName"
                  name="businessName"
                  label="Company name"
                  sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
                  type="text"
                  value={businessName}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
                <TextField
                  variant="outlined"
                  id="registrationNumber"
                  name="registrationNumber"
                  label="Company Registration number"
                  sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setRegNum(e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  variant="outlined"
                  id="companyPhone"
                  name="companyPhone"
                  label="Company phone(tel)"
                  sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
                  type="tel"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  required
                />
                <TextField
                  variant="outlined"
                  id="contactPerson"
                  name="contactPerson"
                  label="Contact Person Fullname"
                  sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  required
                />
              </Grid>
            </>
          )}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              variant="outlined"
              sx={{ margin: (theme) => theme.spacing(1), width: "75%" }}
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <PhoneInput
              country={"zw"}
              value={phoneNumber}
              onChange={handleInputChange}
              inputStyle={{
                width: "75%",
                margin: "8px 0",
                backgroundColor: isDarkMode ? "#333" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                borderColor: isDarkMode ? "#666" : "#ccc",
              }}
              buttonStyle={{
                backgroundColor: isDarkMode ? "#333" : "#fff",
              }}
              inputProps={{
                name: "phoneNumber",
                required: true,
              }}
            />
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 25,
          marginBottom: 15,
        }}
      >
        <StyledButton
          variant="contained"
          color="default"
          startIcon={<ArrowBack fontSize="small" />}
          onClick={handleBack}
        >
          Back
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          endIcon={<ArrowForward fontSize="small" />}
          onClick={handleNext}
          disabled={!isNextEnabled}
        >
          Next
        </StyledButton>
      </div>
    </React.Fragment>
  );
}
