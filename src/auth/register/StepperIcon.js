import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Bloodtype,
  Info,
  AddLocationAlt,
  GroupAdd,
  Reviews,
} from "@mui/icons-material"; 
import {Box} from "@mui/material"

const StyledRoot = styled(Box)(({ theme, active, completed }) => ({
  backgroundColor: active || completed ? theme.palette.primary.main : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: active ? "0 4px 10px 0 rgba(0,0,0,.25)" : "none",
}));

const StepperIcon = (props) => {
  const { active, completed, icon } = props;

  const icons = {
    1: <Bloodtype />,
    2: <Info />,
    3: <AddLocationAlt />,
    4: <GroupAdd />,
    5: <Reviews />,
  };

  return (
    <StyledRoot active={active} completed={completed}>
      {icons[String(icon)]}
    </StyledRoot>
  );
};

StepperIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number.isRequired,
};

export default StepperIcon;
