import React, { useState } from "react";
import Info from "./Info";
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  CardActionArea,
  CardContent,
  FormControl,
  RadioGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import {
  AccountBalanceRounded,
  CreditCardRounded,
  WarningRounded,
  SendRounded,
} from "@mui/icons-material";
import MuiCard from "@mui/material/Card";
import Controls from "../../../components/Controls";

const Card = styled(MuiCard)(() => ({
  border: "1px solid",
  width: "100%",
  "&:hover": {
    borderColor: "primary.light",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  },
  "@media (min-width: 960px)": {
    flexGrow: 1,
    maxWidth: "calc(50% - 8px)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default function Checkout({ item, submitPayment }) {
  const [paymentType, setPaymentType] = useState("creditCard");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [name, setName] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  const isSubmitEnabled =
    cvv && cardNumber && expirationDate && name && amountPaid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitEnabled) {
      const payment_details = {
        payment: item.client_loan_payment?.uuid,
        loanEMI: item.client_loan_payment?.loanEMI,
        amountPaid: amountPaid,
      };
      if (
        parseFloat(amountPaid) >= parseFloat(item.client_loan_payment?.loanEMI)
      ) {
        submitPayment(payment_details);
      } else {
        alert(
          "Minimum amount to be paid is the monthly installed, figure less than that is not accepted"
        );
      }
    }
  };
  return (
    <>
      <CssBaseline enableColorScheme />
      <Grid
        container
        sx={{
          mt: {
            xs: 2,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 2,
            px: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info item={item} />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            alignItems: "start",
            pt: { xs: 0, sm: 2 },
            px: { xs: 1, sm: 6 },
            gap: { xs: 1, md: 2 },
          }}
        >
          <form>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                aria-label="Payment options"
                name="paymentType"
                value={paymentType}
                onChange={handlePaymentTypeChange}
                style={{ display: "flex", flexDirection: "row", gap: "15px" }}
              >
                <Card>
                  <CardActionArea onClick={() => setPaymentType("creditCard")}>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <CreditCardRounded fontSize="large" color="primary" />
                      <Typography style={{ fontWeight: "500" }}>
                        Card
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card>
                  <CardActionArea
                    onClick={() => setPaymentType("bankTransfer")}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <AccountBalanceRounded fontSize="large" color="primary" />
                      <Typography style={{ fontWeight: "500" }}>
                        Bank account
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </RadioGroup>
            </FormControl>
            {paymentType === "creditCard" && (
              <>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="subtitle2">Credit card</Typography>
                  <CreditCardRounded />
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Controls.Input
                      id="card-number"
                      name="card-number"
                      label="Card number"
                      autoComplete="card-number"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      sx={{
                        margin: (theme) => theme.spacing(1),
                        width: "100%",
                      }}
                      required
                      autoFocus
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controls.Input
                      id="cvv"
                      name="cvv"
                      label="Cvv"
                      autoComplete="CVV"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      sx={{
                        margin: (theme) => theme.spacing(1),
                        width: "100%",
                      }}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controls.Input
                      id="name"
                      label="Name"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder="Don bebe"
                      sx={{
                        margin: (theme) => theme.spacing(1),
                        width: "100%",
                      }}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controls.Input
                      id="card-expiration"
                      name="card-expiration"
                      label="Card-expiration"
                      autoComplete="card-expiration"
                      placeholder="MM/YY"
                      value={expirationDate}
                      onChange={handleExpirationDateChange}
                      sx={{
                        margin: (theme) => theme.spacing(1),
                        width: "100%",
                      }}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Controls.Input
                      id="amountPaid"
                      name="amountPaid"
                      label="Amount to being paid"
                      type="number"
                      value={amountPaid}
                      onChange={(e) => {
                        setAmountPaid(e.target.value);
                      }}
                      sx={{
                        margin: (theme) => theme.spacing(1),
                        width: "100%",
                      }}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <StyledButton
                        variant="contained"
                        color="primary"
                        endIcon={<SendRounded fontSize="small" />}
                        disabled={!isSubmitEnabled}
                        onClick={handleSubmit}
                      >
                        Make payment
                      </StyledButton>
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
            {paymentType === "bankTransfer" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Alert severity="warning" icon={<WarningRounded />}>
                  Your order will be processed once we receive the funds.
                </Alert>
                <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                  Bank account
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Please transfer the payment to the bank account details shown
                  below.
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Bank:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    Mastercredit
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Account number:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    123456789
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Routing number:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    987654321
                  </Typography>
                </Box>
              </Box>
            )}
          </form>
        </Grid>
      </Grid>
    </>
  );
}
