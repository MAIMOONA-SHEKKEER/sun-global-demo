import React from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import {
  CustomText,
  CustomSnackbar,
  CustomTextField,
  StyledGrid,
  SubmitButton,
} from "../styles/StyledComponents";
import Banner from "./Banner";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import { OtpForm } from "./OtpForm";

const ResetPasswordForm = () => {
  const {
    credentials,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSendOtp,
    handleSnackbarClose,
    loading,
    handleOtpChange,
  } = useResetPasswordForm();

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <Box component="form" p={2} onSubmit={handleSubmit} gap={5}>
          <CustomText fontSize={25}>
            {otpSent ? "Reset Password" : "Request OTP for Password Change"}
          </CustomText>
          {!otpSent ? (
            <>
              <CustomTextField
                fullWidth
                required
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your Email Address"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ marginBottom: 2 }}
              />
              <SubmitButton
                text={loading ? <CircularProgress size={24} /> : "Send OTP"}
                fullWidth
                onClick={handleSendOtp}
                disabled={credentials.email.trim() === "" || loading}
              />
            </>
          ) : (
            <>
              <OtpForm
                handleOtpChange={handleOtpChange}
                otpError={errors.otp}
                loading={loading}
                credentials={credentials}
                reset={"reset"}
              />
              <CustomTextField
                fullWidth
                required
                id="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter your new password"
                name="newPassword"
                value={credentials.newPassword}
                onChange={handleChange}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                sx={{ marginBottom: 2 }}
              />
              <SubmitButton
                text={loading ? <CircularProgress size={24} /> : "Reset"}
                fullWidth
                disabled={loading}
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
        onClose={handleSnackbarClose}
      />
    </Grid>
  );
};

export default ResetPasswordForm;
