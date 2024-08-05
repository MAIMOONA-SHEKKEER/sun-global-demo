import React, { useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import Banner from "./Banner";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import { OtpForm } from "./OtpForm";
import StyledGrid from "../styles/components/StyledGrid";
import { CustomText } from "../styles/components/CustomText";
import CustomTextField from "../styles/components/CustomTextField";
import CustomButton from "../styles/components/CustomButton";
import StyledLink from "../styles/components/StyledLink";
import CustomSnackbar from "../styles/components/CustomSnackbar";

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
    showResendOtpButton,
    onResendOtpClick,
  } = useResetPasswordForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <Box component="form" p={2} onSubmit={handleSubmit}>
          <CustomText fontSize={22}>
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
              <CustomButton
                onClick={handleSendOtp}
                disabled={credentials.email.trim() === "" || loading}
                text={loading ? <CircularProgress size={24} /> : "Send OTP"}
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
                showResendOtpButton={showResendOtpButton}
                onResendOtpClick={onResendOtpClick}
              />
              <CustomTextField
                fullWidth
                required
                id="newPassword"
                label="New Password"
                type={showPassword ? "password-visible" : "password"}
                placeholder="Enter your new password"
                name="newPassword"
                value={credentials.newPassword}
                onChange={handleChange}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                showPassword={showPassword}
                onClick={handleClickShowPassword}
                sx={{ marginBottom: 2 }}
              />
              <CustomButton type="submit" text={"Reset"} fullWidth />
            </>
          )}
          <StyledLink href="/login" fontSize={18}>
            Go back to login page
          </StyledLink>
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
