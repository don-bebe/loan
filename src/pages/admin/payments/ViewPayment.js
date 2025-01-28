import React from "react";
import Grid from "@mui/material/Grid2";
import Title from "../../../utils/Title";
import Controls from "../../../components/Controls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ViewPayment({ item }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Title>Client personal details</Title>
          <Controls.Input
            name="firstName"
            label="Name"
            value={
              item.client_loan_application?.client_individual_detail
                ? item.client_loan_application?.client_individual_detail
                    ?.firstName +
                  " " +
                  item.client_loan_application?.client_individual_detail
                    ?.lastName
                : item.client_loan_application?.client_business_detail
                    ?.businessName
            }
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="registrationNumber"
            label="Registration number"
            value={
              item.client_loan_application?.client_individual_detail
                ? item.client_loan_application?.client_individual_detail
                    ?.ID_number
                : item.client_loan_application?.client_business_detail
                    ?.registrationNumber
            }
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="emailAddress"
            label="Email Address"
            value={
              item.client_loan_application?.client_individual_detail
                ? item.client_loan_application?.client_individual_detail
                    ?.emailAddress
                : item.client_loan_application?.client_business_detail
                    ?.emailAddress
            }
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="phoneNumber"
            label="Phone number"
            value={
              item.client_loan_application?.client_individual_detail
                ? item.client_loan_application?.client_individual_detail
                    ?.phoneNumber
                : item.client_loan_application?.client_business_detail
                    ?.phoneNumber
            }
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Title>Loan application</Title>
          <span style={{ marginLeft: 15 }}>
            Date: {new Date(item.createdAt).toDateString()}
          </span>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>$</TableCell>
                <TableCell>$</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Gross loan</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {item.client_loan_application?.loanAmount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Origination</TableCell>
                <TableCell>
                  {item.client_loan_application?.originationFee}%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Interest</TableCell>
                <TableCell>
                  {item.client_loan_application?.interestRate}%
                </TableCell>
                <TableCell>{item.totalInterest}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>EMI</TableCell>
                <TableCell>{item.loanEMI}</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  <strong>{item.totalEMIPaid || 0}</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Total Amount Payable</b>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <b>{item.totalPayment}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Title>Payment history</Title>
          <Table>
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
              {item.client_loan_payment_histories?.map((x, index) => (
                <TableRow
                  key={item.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}
