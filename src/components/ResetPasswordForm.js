import React, { useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import {
  CustomHeader,
  CustomSnackbar,
  CustomTextField,
  StyledGrid,
  SubmitButton,
} from "../styles/StyledComponents";
import Banner from "./Banner";
import { sendOtp, resetPassword } from "../api/auth";
import { validateEmail, validatePassword } from "../utils/validators";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [errors, setErrors] = useState({ email: "", otp: "", newPassword: "" });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrors({ email: "", otp: "", newPassword: "" });

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
      return;
    }

    setLoading(true);
    try {
      const response = await sendOtp(email, 'password-otp'); 
      if (response.success) {
        setStep(2);
        setSnackbar({
          open: true,
          message: "OTP sent to your email address.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Failed to send OTP. Please try again.",
          severity: "error",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to send OTP. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({ email: "", otp: "", newPassword: "" });

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
      return;
    }
    if (!otp) {
      setErrors((prevErrors) => ({ ...prevErrors, otp: "OTP is required." }));
      return;
    }
    if (!validatePassword(newPassword)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "Password must be at least 6 characters long.",
      }));
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({ email, newPassword, otp });
      if (response.success) {
        setSnackbar({
          open: true,
          message: "Password reset successfully.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Failed to reset password. Please try again.",
          severity: "error",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to reset password. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: false }));
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <CustomHeader>
          {step === 1 ? "Request OTP" : "Reset Password"}
        </CustomHeader>
        <Box
          component="form"
          p={2}
          maxWidth={400}
          onSubmit={step === 1 ? handleSendOtp : handleResetPassword}
        >
          {step === 1 ? (
            <>
              <CustomTextField
                fullWidth
                required
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ marginBottom: 2 }}
              />
              <SubmitButton
                text={loading ? <CircularProgress size={24} /> : "Send OTP"}
                fullWidth
              />
            </>
          ) : (
            <>
              <CustomTextField
                fullWidth
                required
                id="otp"
                label="OTP"
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={!!errors.otp}
                helperText={errors.otp}
                sx={{ marginBottom: 2 }}
              />
              <CustomTextField
                fullWidth
                required
                id="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter your new password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                sx={{ marginBottom: 2 }}
              />
              <SubmitButton
                text={loading ? <CircularProgress size={24} /> : "Reset"}
                fullWidth
              />
            </>
          )}
        </Box>
      </StyledGrid>
      <Banner />
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Grid>
  );
};

export default ResetPasswordForm;
