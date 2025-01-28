import React from "react";
import Grid from "@mui/material/Grid2";
import Title from "../../../utils/Title";
import {
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Controls from "../../../components/Controls";

export default function ViewLoan({ item }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Title>Loan Application details</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Value</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Loan type</TableCell>
                <TableCell>{item.loanType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Applied amount</TableCell>
                <TableCell>${item.loanAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Interest rate</TableCell>
                <TableCell>{item.interestRate}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Origination fee</TableCell>
                <TableCell>{item.originationFee}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Loan term</TableCell>
                <TableCell>{item.loanTerm} months</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Amount received</TableCell>
                <TableCell>${item.netLoanAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Loan status</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Title>Payment</Title>
          <Controls.Input
            name="loanEMI"
            label="Monthly installment"
            value={item.client_loan_payment?.loanEMI}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: <InputAdornment>$</InputAdornment>,
            }}
          />
          <Controls.Input
            name="totalInterest"
            label="Total interest"
            value={item.client_loan_payment?.totalInterest}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: <InputAdornment>$</InputAdornment>,
            }}
          />
          <Controls.Input
            name="totalPayment"
            label="Amount to be paid"
            value={item.client_loan_payment?.totalPayment}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: <InputAdornment>$</InputAdornment>,
            }}
          />
          <Controls.Input
            name="status"
            label="Status"
            value={item.client_loan_payment?.status}
            inputProps={{ readOnly: true }}
          />
        </Grid>
        {item.client_loan_payment?.client_loan_payment_histories &&
          item.client_loan_payment?.client_loan_payment_histories?.length >
            0 && (
            <Grid size={{ xs: 12 }}>
              <Title>Payment history</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>id</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Payment date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Amount paid($)</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Balance($)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.client_loan_payment?.client_loan_payment_histories?.map(
                    (x, index) => (
                      <TableRow
                        key={item.uuid}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          {new Date(x.paidAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{x.amountPaid}</TableCell>
                        <TableCell>{x.remainingAmount}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Grid>
          )}
      </Grid>
    </>
  );
}
