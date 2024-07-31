import React, { useState } from "react";
import { Grid, Avatar, Snackbar, Alert, Box } from "@mui/material";
import { sendOtp, loginUser } from "../api/apiService";
import {
  CustomHeader,
  CustomText,
  StyledGrid,
  StyledLink,
} from "../styles/StyledComponents";
import Banner from "./Banner";
import EmailPasswordLogin from "./EmailPasswordLogin";
import EmailOtpLogin from "./EmailOtpLogin";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [loginMethod, setLoginMethod] = useState("email-password");
  const [otpSent, setOtpSent] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleOtpChange = (otp) => {
    setCredentials({ ...credentials, otp });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSendOtp = async () => {
    try {
      await sendOtp(credentials.email);
      setSnackbarMessage("OTP sent to your email!");
      setSnackbarSeverity("success");
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setSnackbarMessage("Failed to send OTP.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(loginMethod, credentials);
    console.log("Login Response:", response); 
    setSnackbarSeverity("success");

  } catch (error) {
    console.error("Login error:", error);
    setSnackbarMessage("Login failed");
    setSnackbarSeverity("error");
  } finally {
    setSnackbarOpen(true);
  }
  };

  const toggleLoginMethod = () => {
    setLoginMethod((prevMethod) =>
      prevMethod === "email-password" ? "email-otp" : "email-password"
    );
    setOtpSent(false);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid container item xs={12} md={6}>
        <Avatar sx={{ m: 1 }} />
        <CustomHeader>Welcome Back!</CustomHeader>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 360 }}>
          {loginMethod === "email-password" ? (
            <EmailPasswordLogin
              credentials={credentials}
              handleChange={handleChange}
              toggleLoginMethod={toggleLoginMethod}
            />
          ) : (
            <EmailOtpLogin
              credentials={credentials}
              handleOtpChange={handleOtpChange}
              handleSendOtp={handleSendOtp}
              handleChange={handleChange}
              otpSent={otpSent}
              toggleLoginMethod={toggleLoginMethod}
            />
          )}
          <CustomText>OR</CustomText>
          <StyledLink
            href="/register"
            variant="body2"
            sx={{ textAlign: "center" }}
          >
            Don't have an account? Register here
          </StyledLink>
        </Box>
      </StyledGrid>
      <Banner />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default LoginForm;
