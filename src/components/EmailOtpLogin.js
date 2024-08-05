import React from "react";
import { Button, Box } from "@mui/material";
import { OtpForm } from "./OtpForm";
import StyledLink from "../styles/components/StyledLink";
import CustomTextField from "../styles/components/CustomTextField";

const EmailOtpLogin = ({
  credentials,
  handleChange,
  handleOtpChange,
  handleSendOtp,
  onVerifyOtpClick,
  otpError,
  loading,
  otpSent,
  errors,
  toggleLoginMethod,
  setErrors,
  showResendOtpButton, 
  onResendOtpClick, 
}) => {
  
  const validateEmail = () => {
    let valid = true;
    let newErrors = {};

    if (!credentials.email) {
      valid = false;
      newErrors.email = "Email is required.";
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSendOtpClick = () => {
    if (validateEmail()) {
      handleSendOtp();
    }
  };

  return (
    <Box>
      {!otpSent ? (
        <>
          <CustomTextField
            fullWidth
            required
            id="email"
            label="Email Address"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <Button
            onClick={handleSendOtpClick}
            variant="contained"
            sx={{ m: 1 }}
            fullWidth
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
          <StyledLink onClick={toggleLoginMethod} mt={2}>
            Go back to login with Email & Password
          </StyledLink>
        </>
      ) : (
        <>
          <OtpForm
            handleOtpChange={handleOtpChange}
            onVerifyOtpClick={onVerifyOtpClick}
            otpError={otpError}
            loading={loading}
            credentials={credentials}
            showResendOtpButton={showResendOtpButton}
            onResendOtpClick={onResendOtpClick}
          />
          <StyledLink onClick={toggleLoginMethod}>
            Go back to login with Email & Password
          </StyledLink>
        </>
      )}
    </Box>
  );
};

export default EmailOtpLogin;
