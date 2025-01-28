import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import MultiFormContext from "../../utils/MultiFormContext";
import Title from "../../utils/Title";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(1),
}));

export default function AddressInfo() {
  const {
    handleBack,
    handleNext,
    isIndividual,
    addressLine1,
    setAddress,
    city,
    setCity,
    country,
    setCountry,
    addressLine2,
    setAddress2,
  } = useContext(MultiFormContext);

  const isNextEnabled = addressLine1 && city && country;
  return (
    <React.Fragment>
      <Title>
        {isIndividual
          ? "Individual Client Home Address"
          : "Business Client Address"}
      </Title>
      <div style={{ marginLeft: 20 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              variant="outlined"
              id="addressLine1"
              name="addressLine1"
              label="Address line"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              type="text"
              value={addressLine1}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              multiline
              rows={4}
              autoFocus
              required
            />
            <TextField
              variant="outlined"
              id="city"
              name="city"
              label="City"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              variant="outlined"
              id="addressLine2"
              name="addressLine2"
              label="Address line(optional)"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              type="text"
              value={addressLine2}
              onChange={(e) => {
                setAddress2(e.target.value);
              }}
              multiline
              rows={4}
            />
            <TextField
              variant="outlined"
              id="country"
              name="country"
              label="Country"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              type="text"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
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
