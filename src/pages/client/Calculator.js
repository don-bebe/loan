import React, { useState } from "react";
import PageHeader from "../../utils/PageHeader";
import { CalculateTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Notification from "../../utils/Notification";

export default function Calculator() {
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loanValue, setLoanValue] = useState(0);
  const [time, setTime] = useState(0);
  const [interest, setInterest] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [origination, setOrigination] = useState(0);
  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const calculateLoan = () => {
    if (principal > 0 && interest > 0 && time > 0) {
      let p = parseFloat(principal);
      let r = parseFloat(interest);
      let n = parseInt(time);
      let o = parseFloat(origination / 100);

      let actualRate = parseFloat(r / 12 / 100);
      let ogFee = o * p;

      let a = p - ogFee;

      let calcEmi =
        p *
        actualRate *
        (Math.pow(1 + actualRate, n) / (Math.pow(1 + actualRate, n) - 1));
      setEmi(parseFloat(calcEmi).toFixed(2));
      setTotalInterest(parseFloat(calcEmi * n - p).toFixed(2));
      setAmount(parseFloat(calcEmi * n).toFixed(2));
      setLoanValue(parseFloat(a).toFixed(2));
    } else {
      setNotify({
        open: true,
        severity: "error",
        message:
          "Loan Amount, Interest and Repayment period must be greater than 0!",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="MicroLend | Loan Calculator"
        subTitle="Calculate loan before you apply"
        icon={<CalculateTwoTone fontSize="large" />}
      />
      <Container className="mt-10">
        <div style={{ overflowY: "auto", padding: "40px" }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ m: 2 }} />
              <TextField
                label="Enter loan Amount"
                type="number"
                variant="outlined"
                name="loan_amount"
                sx={{ minWidth: "90%" }}
                value={principal}
                onChange={(e) => {
                  setPrincipal(e.target.value);
                }}
                autoFocus
                required
              />
              <Box sx={{ m: 2 }} />
              <TextField
                label="Enter interest rate"
                variant="outlined"
                type="number"
                name="interest_rate"
                sx={{ minWidth: "90%" }}
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 0.01,
                  pattern: "[0-9]+(.[0-9]{1,2})?",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                }}
                required
              />
              <Box sx={{ m: 2 }} />
              <TextField
                label="Enter repayment period in months"
                variant="outlined"
                type="number"
                name="loan_period_in_month"
                inputProps={{ min: 1, step: 1 }}
                sx={{ minWidth: "90%" }}
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                required
              />
              <Box sx={{ m: 2 }} />
              <TextField
                label="Enter origination fee"
                variant="outlined"
                type="number"
                name="loan_period_in_month"
                sx={{ minWidth: "90%" }}
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 0.01,
                  pattern: "[0-9]+(.[0-9]{1,2})?",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                value={origination}
                onChange={(e) => {
                  setOrigination(e.target.value);
                }}
              />
              <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <FormControl
                  size="large"
                  align="center"
                  style={{ marginTop: "10px" }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={calculateLoan}
                  >
                    Calculate
                  </Button>
                </FormControl>
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              alignItems="center"
              justifyContent="center"
            >
              <Box sx={{ m: 2 }} />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="p">
                          Equal Monthly Installment
                        </Typography>
                        <Box sx={{ m: 1 }} />
                        <Typography variant="h6" className="font-bold">
                          $ {emi}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ m: 2 }} />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="p">
                          Total Interest Payable
                        </Typography>
                        <Box sx={{ m: 1 }} />
                        <Typography variant="h6" className="font-bold">
                          $ {totalInterest}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ m: 2 }} />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="p">
                          Total Payment (Principal + Interest)
                        </Typography>
                        <Box sx={{ m: 1 }} />
                        <Typography variant="h6" className="font-bold">
                          $ {amount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ m: 2 }} />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="p">
                          Total loaned amount (Principal - Origination fee)
                        </Typography>
                        <Box sx={{ m: 1 }} />
                        <Typography variant="h6" className="font-bold">
                          $ {loanValue}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
