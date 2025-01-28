import React, { useContext } from "react";
import Title from "../../utils/Title";
import { styled } from "@mui/material/styles";
import { Grid, TextField, Button } from "@mui/material";
import MultiFormContext from "../../utils/MultiFormContext";
import { ArrowBack, Send } from "@mui/icons-material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(1),
}));

export default function SignUp() {
  const {
    isIndividual,
    firstName,
    lastName,
    businessName,
    emailAddress,
    phoneNumber,
    handleBack,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  } = useContext(MultiFormContext);

  const isNextEnabled = password && confirmPassword;

  return (
    <React.Fragment>
      <Title>Create login credentials</Title>
      <div style={{ marginLeft: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant="outlined"
              id="name"
              name="name"
              label="Name"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              type="text"
              value={isIndividual ? firstName + " " + lastName : businessName}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant="outlined"
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              type="email"
              value={emailAddress}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant="outlined"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone number"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              type="tel"
              value={phoneNumber}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="password"
              name="password"
              label="Password"
              sx={{ margin: (theme) => theme.spacing(1), width: "50%" }}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoFocus
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              sx={{ margin: (theme) => theme.spacing(1), width: "50%" }}
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
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
        >Back</StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          endIcon={<Send fontSize="small" />}
          disabled={!isNextEnabled}
          onClick={handleSubmit}>Register</StyledButton>
      </div>
    </React.Fragment>
  );
}
