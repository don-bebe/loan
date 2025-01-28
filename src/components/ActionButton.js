import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme, color }) => ({
  minWidth: 0,
  margin: theme.spacing(0.5),
  color:
    color === "secondary"
      ? theme.palette.info.dark
      : theme.palette.primary.main,
}));

export default function ActionButton(props) {
  const { color, children, onClick } = props;

  return (
    <StyledButton color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
