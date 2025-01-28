import React from "react";
import { Paper, Card, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const HeaderDiv = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  marginBottom: theme.spacing(0.5),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: theme.spacing(1),
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.background.paper,
}));

const TitleDiv = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  "& .MuiTypography-subtitle2": {
    opacity: 0.7,
  },
}));

export default function PageHeader(props) {
  const theme = useTheme(); // Hook to access the current theme
  const { title, subTitle, icon } = props;

  return (
    <StyledPaper elevation={0} square>
      <HeaderDiv>
        <StyledCard>{icon}</StyledCard>
        <TitleDiv>
          <Typography
            variant="h6"
            component="div"
            color={theme.palette.text.primary}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            color={theme.palette.text.secondary}
          >
            {subTitle}
          </Typography>
        </TitleDiv>
      </HeaderDiv>
    </StyledPaper>
  );
}
