import { Close, Send } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateLoanApplication,
  reset,
} from "../../../functions/loanApplySlice";
import Loading from "../../../utils/Loading";
import Notification from "../../../utils/Notification";

const ApplyLoan = (props) => {
  const { open, setOpen, selectedPackage, packages, setSelectedPackage } =
    props;

  const { apply, isError, isSuccess, message } = useSelector(
    (state) => state.apply
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      setLoading(false);
      setNotify({
        open: true,
        severity: "error",
        message: message,
      });
    }
    if (apply && isSuccess) {
      setLoading(false);
      setNotify({
        open: true,
        severity: "success",
        message: message,
      });
      setOpen(false);

      setTimeout(() => {
        navigate("/loan");
      }, 3000);
    }
    dispatch(reset());
  }, [apply, dispatch, isError, isSuccess, message, navigate, setOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const application_details = {
      packageID: selectedPackage,
      loanAmount: loanAmount,
      loanTerm: loanTerm,
    };
    try {
      if (!selectedPackage) {
        setNotify({
          open: true,
          severity: "warning",
          message: "Please select a package to apply for",
        });
      }
      setLoading(true);
      dispatch(CreateLoanApplication(application_details));
    } catch (error) {
      setNotify({
        open: true,
        severity: "error",
        message: error,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <strong>MicroLend loan application form</strong>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Complete the loan application form
              <br />
              *Origination fee is subtracted from the amount you are applying
              for
              <br />
            </DialogContentText>
            <FormControl
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
            >
              <FormLabel component="legend">Package Name</FormLabel>
              <Select
                labelId="package-select-label"
                value={selectedPackage?.id || ""}
                onChange={(e) =>
                  setSelectedPackage(
                    packages.find((pkg) => pkg.id === e.target.value)
                  )
                }
              >
                {packages.map((pkg) => (
                  <MenuItem key={pkg.id} value={pkg.id}>
                    {pkg.packageName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="number"
              variant="outlined"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              id="loanAmount"
              label="Enter loan amount"
              value={loanAmount}
              onChange={(e) => {
                setLoanAmount(e.target.value);
              }}
              inputProps={{
                min: selectedPackage?.minLoanAmount,
                max: selectedPackage?.maxLoanAmount,
              }}
              required
            />
            <TextField
              type="number"
              variant="outlined"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              id="loanTerm"
              label="Enter loan repayment period"
              value={loanTerm}
              onChange={(e) => {
                setLoanTerm(e.target.value);
              }}
              inputProps={{
                min: selectedPackage?.minRepaymentPeriod,
                max: selectedPackage?.maxRepaymentPeriod,
              }}
              required
            />
            <TextField
              variant="outlined"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              name="interestRate"
              label="Interest rate"
              value={`${selectedPackage?.minInterestRate}-${selectedPackage?.maxInterestRate}%`}
              inputProps={{ readOnly: true }}
            />
            <TextField
              variant="outlined"
              sx={{ margin: (theme) => theme.spacing(1), width: "80%" }}
              name="originationFee"
              label="Origination fee"
              value={`${selectedPackage?.minOriginationFee}-${selectedPackage?.maxOriginationFee}%`}
              inputProps={{ readOnly: true }}
            />
          </DialogContent>
          <DialogActions sx={{ px: "19px" }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Apply
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ApplyLoan;
