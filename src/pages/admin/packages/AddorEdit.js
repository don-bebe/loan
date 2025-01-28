import React, { useEffect } from "react";
import { useForm, Form } from "../../../utils/useForm";
import { InputAdornment } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Controls from "../../../components/Controls";

const initialFValues = {
  packageName: "",
  description: "",
  minLoanAmount: "",
  maxLoanAmount: "",
  minRepaymentPeriod: "",
  maxRepaymentPeriod: "",
  minInterestRate: "",
  maxInterestRate: "",
  minOriginationFee: "",
  maxOriginationFee: "",
  latePaymentFee: "",
  isActive: false,
};

export default function AddorEdit(props) {
  const { recordForEdit, submitRecord } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("packageName" in fieldValues)
      temp.packageName = fieldValues.packageName ? "" : "Name the package.";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Provide package description.";
    if ("minLoanAmount" in fieldValues)
      temp.minLoanAmount = fieldValues.minLoanAmount
        ? ""
        : "Enter minimum loan amount";
    if ("maxLoanAmount" in fieldValues)
      temp.maxLoanAmount = fieldValues.maxLoanAmount
        ? ""
        : "Enter maximum loan amount.";
    if ("minRepaymentPeriod" in fieldValues)
      temp.minRepaymentPeriod = fieldValues.minRepaymentPeriod
        ? ""
        : "Enter minimum repayment period";
    if ("maxRepaymentPeriod" in fieldValues)
      temp.maxRepaymentPeriod = fieldValues.maxRepaymentPeriod
        ? ""
        : "Enter maximum repayment period.";
    if ("minInterestRate" in fieldValues)
      temp.minInterestRate = fieldValues.minInterestRate
        ? ""
        : "Enter minimum interest rate";
    if ("maxLoanAmount" in fieldValues)
      temp.maxLoanAmount = fieldValues.maxLoanAmount
        ? ""
        : "Enter maximum loan amount.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      submitRecord(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
    // eslint-disable-next-line
  }, [recordForEdit]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controls.Input
            name="packageName"
            label="Package name"
            type="text"
            value={values.packageName}
            onChange={handleInputChange}
            error={errors.packageName}
            autoFocus
            required
          />
          <Controls.Input
            name="minLoanAmount"
            label="Minimum loan Amount"
            type="number"
            value={values.minLoanAmount}
            onChange={handleInputChange}
            error={errors.minLoanAmount}
            required
          />
          <Controls.Input
            name="minRepaymentPeriod"
            label="Minimum repayment period(months)"
            type="number"
            value={values.minRepaymentPeriod}
            onChange={handleInputChange}
            error={errors.minRepaymentPeriod}
            inputProps={{ min: 1, step: 1 }}
            required
          />
          <Controls.Input
            name="minInterestRate"
            label="Minimum interest rate"
            type="number"
            value={values.minInterestRate}
            onChange={handleInputChange}
            error={errors.minInterestRate}
            inputProps={{
              min: 0,
              max: 100,
              step: 0.01,
              pattern: "[0-9]+(.[0-9]{1,2})?",
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            required
          />
          <Controls.Input
            name="minOriginationFee"
            label="Min Origination fee"
            type="number"
            value={values.minOriginationFee}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              max: 100,
              step: 0.01,
              pattern: "[0-9]+(.[0-9]{1,2})?",
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            required
          />
          <Controls.Checkbox
            name="isActive"
            value={values.isActive}
            label="isActive"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controls.Input
            name="description"
            label="Description"
            type="text"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
            required
          />
          <Controls.Input
            name="maxLoanAmount"
            label="Maximum loan Amount"
            type="number"
            value={values.maxLoanAmount}
            onChange={handleInputChange}
            error={errors.maxLoanAmount}
            required
          />
          <Controls.Input
            name="maxRepaymentPeriod"
            label="Maximum repayment period(months)"
            type="number"
            value={values.maxRepaymentPeriod}
            onChange={handleInputChange}
            error={errors.maxRepaymentPeriod}
            inputProps={{ min: 5, step: 1 }}
            required
          />
          <Controls.Input
            name="maxInterestRate"
            label="Maximum interest rate"
            type="number"
            value={values.maxInterestRate}
            onChange={handleInputChange}
            error={errors.maxInterestRate}
            inputProps={{
              min: 0,
              max: 100,
              step: 0.01,
              pattern: "[0-9]+(.[0-9]{1,2})?",
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            required
          />
          <Controls.Input
            name="maxOriginationFee"
            label="Max Origination fee"
            type="number"
            value={values.maxOriginationFee}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              max: 100,
              step: 0.01,
              pattern: "[0-9]+(.[0-9]{1,2})?",
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            required
          />
          <Controls.Input
            name="latePaymentFee"
            label="Late payment fee"
            type="number"
            value={values.latePaymentFee}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              max: 100,
              step: 0.01,
              pattern: "[0-9]+(.[0-9]{1,2})?",
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            required
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
