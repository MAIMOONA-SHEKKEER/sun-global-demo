import React from "react";
import { Button, Card, CircularProgress, Box } from "@mui/material";
import OtpInput from "react18-input-otp";
import {
  CustomText,
  CustomTextField,
  StyledCardContent,
  StyledLink,
  SubmitButton,
} from "../styles/StyledComponents";

const EmailOtpLogin = ({
  credentials,
  handleChange,
  handleOtpChange,
  handleSendOtp,
  onVerifyOtpClick,
  otpError,
  loading,
  otpSent,
  toggleLoginMethod,
}) => {
  return (
    <>
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
          />
          <Button
            onClick={handleSendOtp}
            variant="contained"
            sx={{ m: 1 }}
            fullWidth
          >
            Send OTP
          </Button>
          <StyledLink onClick={toggleLoginMethod}>
            Go back to login with Email & Password
          </StyledLink>
        </>
      ) : (
        <>
          <Card sx={{ m: 5 }}>
            <StyledCardContent>
              <CustomText>Enter OTP sent to your Email ID</CustomText>
              <OtpInput
                value={credentials.otp}
                onChange={handleOtpChange}
                numInputs={6}
                separator={<span>-</span>}
              />
              {otpError && <CustomText fontColor="error">{otpError}</CustomText>}
              <SubmitButton
                text="Verify OTP"
                fullWidth
                onClick={onVerifyOtpClick}
                disabled={loading}
              />
              {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <CircularProgress />
                </Box>
              )}
            </StyledCardContent>
          </Card>

          <StyledLink onClick={toggleLoginMethod}>
            Go back to login with Email & Password
          </StyledLink>
        </>
      )}
    </>
  );
};

export default EmailOtpLogin;
