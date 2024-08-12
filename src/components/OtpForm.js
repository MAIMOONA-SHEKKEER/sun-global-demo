import React from "react";
import { Box, Card, CircularProgress} from "@mui/material";
import OtpInput from "react18-input-otp";
import theme from "../styles/Theme";
import { CustomText } from "../styles/components/CustomText";
import StyledCardContent from "../styles/components/StyledCardContent";
import CustomButton from "../styles/components/CustomButton";
import StyledLink from "../styles/components/StyledLink";

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
          {otpError && (
            <CustomText color={theme.palette.error.main}>{otpError}</CustomText>
          )}
          {!reset && (
            <CustomButton
              text="Verify OTP"
              fullWidth
              type="submit"
              onClick={onVerifyOtpClick}
              disabled={loading}
            />
          )}
          {!reset && loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {showResendOtpButton && (
            <StyledLink
              onClick={onResendOtpClick}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Resend OTP?
            </StyledLink>
          )}
        </StyledCardContent>
      </Card>
    </>
  );
};
