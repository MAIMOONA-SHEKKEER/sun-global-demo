import React from "react";
import { Grid, Box, Divider, Chip } from "@mui/material";
import {
  CustomText,
  CustomSnackbar,
  StyledGrid,
  StyledLink,
  StyledAvatar,
} from "../styles/StyledComponents";
import Banner from "./Banner";
import EmailPasswordLogin from "./EmailPasswordLogin";
import EmailOtpLogin from "./EmailOtpLogin";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm = () => {
  const {
    credentials,
    loginMethod,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleOtpChange,
    handleSubmit,
    handleSendOtp,
    toggleLoginMethod,
    handleSnackbarClose,
    onVerifyOtpClick,
    otpError,
    setErrors,
  } = useLoginForm();

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid container item xs={12} md={6}>
        <Box component="form" p={5} onSubmit={handleSubmit}>
          <StyledAvatar />
          <CustomText fontSize={25} mb={1}>
            Welcome Back!
          </CustomText>
          {loginMethod === "email-password" ? (
            <EmailPasswordLogin
              credentials={credentials}
              handleChange={handleChange}
              toggleLoginMethod={toggleLoginMethod}
              errors={errors}
            />
          ) : (
            <EmailOtpLogin
              credentials={credentials}
              handleOtpChange={handleOtpChange}
              handleSendOtp={handleSendOtp}
              handleChange={handleChange}
              otpSent={otpSent}
              toggleLoginMethod={toggleLoginMethod}
              errors={errors}
              onVerifyOtpClick={onVerifyOtpClick}
              otpError={otpError}
              setErrors={setErrors}
            />
          )}
          <Divider sx={{ m: 2 }}>
            <Chip label="OR" size="small" color="primary" />
          </Divider>
          <StyledLink href="/register">
            Don't have an account? Register here
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

export default LoginForm;
