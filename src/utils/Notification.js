import React from "react";
import { Alert, Snackbar } from "@mui/material";

const Notification = (props) => {
  const { notify, setNotify } = props;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotify({
      ...notify,
      open: false,
    });
  };
  return (
    <Snackbar
      open={notify.open}
      autoHideDuration={3500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={notify.severity}
        sx={{ width: "100%" }}
        variant="filled"
        elevation={6}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
