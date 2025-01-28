import React from "react";
import { Alert, AlertTitle, Button, Container, Box, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AccessForbidden = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container sx={{ py: 5, marginTop: 5 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 50, height: 50 }} />
          <Typography variant="h4" sx={{ mt: 2 }}>
            MicroLend System
          </Typography>
        </Box>
        <Alert severity="error" variant="outlined">
          <AlertTitle>Access Denied</AlertTitle>
          You must be logged in to access the requested page. Please sign in to continue.
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            startIcon={<Lock />}
            onClick={() => navigate("/signin")} // Redirect to the sign-in page
          >
            Login
          </Button>
        </Alert>
      </Container>
    </>
  );
};

export default AccessForbidden;