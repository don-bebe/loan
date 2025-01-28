import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

export default function PackageCard(props) {
  const { icon, values, handleClick } = props;

  return (
    <Card
      elevation={3}
      style={{ maxWidth: 350, margin: "1rem", borderRadius: "8px" }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          src="/loans.jpg"
          alt={values.packageName}
          style={{ objectFit: "cover" }}
        />
        <CardHeader
          avatar={icon}
          title={values.packageName}
          titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Description:</strong> {values.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Loan Amount:</strong> {values.minLoanAmount} -{" "}
            {values.maxLoanAmount}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Repayment Period:</strong> {values.minRepaymentPeriod} -{" "}
            {values.maxRepaymentPeriod} months
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Interest Rate:</strong> {values.minInterestRate}% -{" "}
            {values.maxInterestRate}%
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Origination Fee:</strong> {values.minOriginationFee}% -{" "}
            {values.maxOriginationFee}%
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Late Payment Fee:</strong> {values.latePaymentFee}%
          </Typography>
          <Typography variant="body2" color={values.isActive ? "green" : "red"}>
            <strong>Status:</strong> {values.isActive ? "Active" : "Inactive"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
