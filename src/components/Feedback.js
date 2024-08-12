import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Typography,
  Box,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CustomButton from "../styles/components/CustomButton";
import StyledGrid from "../styles/components/StyledGrid";
import Banner from "./Banner";

const FeedbackComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { message = "No message provided", type = "info" } =
    location.state || {};

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <Box mb={2}>
          {type === "success" ? (
            <CheckCircleIcon color="success" style={{ fontSize: 100 }} />
          ) : type === "error" ? (
            <ErrorIcon color="error" style={{ fontSize: 100 }} />
          ) : (
            <ErrorIcon color="action" style={{ fontSize: 100 }} />
          )}
        </Box>
        <Typography variant="h5" gutterBottom>
          {type === "success"
            ? "Congratulations!"
            : type === "error"
            ? "Oops!"
            : "Notification"}
        </Typography>
        <Typography variant="body1" paragraph>
          {message}
        </Typography>
        <CustomButton
          text={type === "success" ? "Go to Login" : "Try Login Again"}
          onClick={handleBack}
        />
      </StyledGrid>
      <Banner />
    </Grid>
  );
};

export default FeedbackComponent;
