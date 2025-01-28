import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import PasswordField from "../../../components/PasswordField";

export default function ChangePassword({ open, setOpen }) {
  const [old, setOld] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle>
        <strong>Change password</strong>
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
      <form>
        <DialogContent>
          <DialogContentText>Please fill in required details</DialogContentText>
          <PasswordField
            label="enter current password"
            value={old}
            onChange={(e) => {
              setOld(e.target.value);
            }}
          />
          <PasswordField
            label="enter new password"
            value={newPassword}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <PasswordField
            label="confirm new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
