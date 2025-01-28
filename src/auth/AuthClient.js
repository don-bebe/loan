import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import PasswordField from "../components/PasswordField";
import { useSelector, useDispatch } from "react-redux";
import { AuthClientLogin, reset } from "../functions/clientAuthSlice";
import Loading from "../utils/Loading";
import Notification from "../utils/Notification";

const AuthClient = (props) => {
  const { openLogin, setOpenLogin } = props;
  const { borrower, isSuccess, isError, message } = useSelector(
    (state) => state.clientAuth
  );
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const dispatch = useDispatch();
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
    if (borrower && isSuccess) {
      setNotify({
        open: true,
        severity: "success",
        message: message,
      });
      setLoading(false);
      setOpenLogin(false);
    }
    dispatch(reset());
  }, [borrower, dispatch, isError, isSuccess, message, setOpenLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailAddress && password) {
      setLoading(true);
      dispatch(AuthClientLogin({ emailAddress, password }));
    }
  };

  return (
    <>
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <DialogTitle>
          <strong>Welcome to MicroLend!</strong>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={() => setOpenLogin(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please fill in your login credentials
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="emailAddress"
              label="Email Address"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              fullWidth
              required
            />
            <PasswordField
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ px: "19px" }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Loading loading={loading} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default AuthClient;
