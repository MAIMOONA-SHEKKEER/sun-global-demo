import React from "react";
import { Button, Box } from "@mui/material";
import { CustomTextField, StyledLink } from "../styles/StyledComponents";
import { OtpForm } from "./OtpForm";

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
