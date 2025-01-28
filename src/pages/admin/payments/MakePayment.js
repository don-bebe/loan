import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Controls from "../../../components/Controls";
import { InputAdornment, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SendRounded } from "@mui/icons-material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default function MakePayment({ item, submitPayment }) {
  const [amountPaid, setAmount] = useState(0);
  const payment_uuid = item.uuid;

  const isSubmitEnabled = amountPaid && payment_uuid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitEnabled) {
      const payment_details = {
        payment_uuid: payment_uuid,
        amountPaid: amountPaid,
      };
      submitPayment(payment_details);
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controls.Input
            name="uuid"
            label="Payment ID"
            value={item.uuid}
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="loanEMI"
            label="Monthly installment"
            value={item.loanEMI}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: <InputAdornment>$</InputAdornment>,
            }}
          />
          <Controls.Input
            name="totalPayment"
            label="Total amount to be paid"
            value={item.totalPayment}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: <InputAdornment>$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controls.Input
            name="totalEMIPaid"
            label="Amount Paid"
            value={item.totalEMIPaid}
            inputProps={{ readOnly: true }}
            InputProps={{
              startAdornment: <InputAdornment>$</InputAdornment>,
            }}
          />
          <Controls.Input
            name="createdAt"
            label="CreatedAt"
            value={new Date(item.createdAt).toLocaleDateString()}
            inputProps={{ readOnly: true }}
          />
          <Controls.Input
            name="updatedAt"
            label="UpdatedAt"
            value={new Date(item.updatedAt).toLocaleDateString()}
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Controls.Input
            name="amountPaid"
            id="amountPaid"
            label="Enter amount"
            type="number"
            value={amountPaid}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            autoFocus
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
  );
}
