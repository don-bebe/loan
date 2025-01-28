import React, { useContext } from "react";
import Title from "../../utils/Title";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import MultiFormContext from "../../utils/MultiFormContext";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  marginLeft: theme.spacing(10),
}));

export default function ClientType() {
  const { setIsIndividual, handleNext } = useContext(MultiFormContext);
  return (
    <React.Fragment>
        <Title>Are you an individual client or business/organization?</Title>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledCard>
            <CardActionArea
              onClick={(e) => {
                setIsIndividual(true);
                handleNext(e);
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="/individuals.jpg"
                alt="Individual"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Individual client
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  A person who applies for a loan based on their financial needs
                  and eligibility. They provide personal details, such as
                  income, employment history, credit score, and other relevant
                  financial information, which are assessed to determine their
                  loan eligibility.
                </Typography>
              </CardContent>
            </CardActionArea>
          </StyledCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledCard>
            <CardActionArea
              onClick={(e) => {
                setIsIndividual(false);
                handleNext(e);
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="/business.jpg"
                alt="Organisation"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Organisational clients
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  A company applying for a loan to support its operational
                  needs, expansion, or investment projects. Business clients
                  provide financial documentation such as revenue statements,
                  tax returns, balance sheets, and business plans to assess
                  their creditworthiness.
                </Typography>
              </CardContent>
            </CardActionArea>
          </StyledCard>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
