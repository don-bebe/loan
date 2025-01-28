import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { NotListedLocation } from "@mui/icons-material";
import Controls from "../components/Controls";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(1),
  position: "absolute",
}));

const StyledIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.error.light,
    cursor: "default",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "3rem",
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <StyledDialog open={confirmDialog.isOpen}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <StyledIcon disableRipple>
          <NotListedLocation />
        </StyledIcon>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Controls.Button
          text="No"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color="error"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </StyledDialog>
  );
}
