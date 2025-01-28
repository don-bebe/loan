import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(2),
  position: "absolute",
  top: theme.spacing(2),
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  paddingRight: "0px",
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <StyledDialog open={openPopup} maxWidth="md" paper>
      <StyledDialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </StyledDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </StyledDialog>
  );
}
