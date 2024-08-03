import React from "react";
import {
  CustomText,
  StyledCardContent,
  SubmitButton,
} from "../styles/StyledComponents";
import { Box, Card, CircularProgress, Button } from "@mui/material";
import OtpInput from "react18-input-otp";
import theme from "../styles/Theme";

export const OtpForm = ({
  credentials,
  handleOtpChange,
  onVerifyOtpClick,
  otpError,
  loading,
  reset,
  onResendOtpClick,
  showResendOtpButton,
}) => {
  return (
    <>
      <Card sx={{ m: 2 }}>
        <StyledCardContent sx={{ padding: reset ? 5 : 10 }}>
          <CustomText>Enter OTP sent to your Email ID</CustomText>
          <OtpInput
            value={credentials.otp}
            onChange={handleOtpChange}
            numInputs={6}
            separator={<span>-</span>}
          />
          {otpError && <CustomText color={theme.palette.error.main}>{otpError}</CustomText>}
          {!reset && <SubmitButton
            text="Verify OTP"
            fullWidth
            onClick={onVerifyOtpClick}
            disabled={loading}
          />}
          {!reset && loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {showResendOtpButton && (
            <Button
              variant="contained"
              onClick={onResendOtpClick}
              disabled={loading}
              sx={{ mt: 2 }}
            >
             Resend OTP
            </Button>
          )}
        </StyledCardContent>
      </Card>
    </>
  );
};
