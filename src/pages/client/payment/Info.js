import { List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

function Info({ item }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Monthly Installment
      </Typography>
      <Typography variant="h4" gutterBottom>
        {item.client_loan_payment?.loanEMI}
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            sx={{ mr: 2 }}
            primary="TotalInterest"
            secondary={`${item.interestRate}%`}
          />
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {item.client_loan_payment?.totalInterest}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            sx={{ mr: 2 }}
            primary="Loan term"
            secondary="Period to finish repaying loan"
          />
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {item.loanTerm}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            sx={{ mr: 2 }}
            primary="Total payment"
            secondary="Amount to be repaid"
          />
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {item.client_loan_payment?.totalPayment}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText sx={{ mr: 2 }} primary="Payment status" />
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {item.client_loan_payment?.status}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export default Info;
