import React from "react";
import { Card } from "@mui/material";
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
  otpSent,
  toggleLoginMethod,
}) => (
  <>
    {otpSent ? (
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
        <SubmitButton onClick={handleSendOtp} text="Send OTP" fullWidth />
        <StyledLink onClick={toggleLoginMethod}>
          Go back to login with Email & Password
        </StyledLink>
      </>
    ) : (
      <>
        <Card sx={{ m: 5 }}>
          <StyledCardContent>
            <CustomText>Enter OTP got on your Email ID</CustomText>
            <OtpInput
              value={credentials.otp}
              onChange={handleOtpChange}
              numInputs={6}
              separator={<span>-</span>}
            />
            <SubmitButton text="Verify OTP" fullWidth />
          </StyledCardContent>
        </Card>

        <StyledLink onClick={toggleLoginMethod}>
          Go back to login with Email & Password
        </StyledLink>
      </>
    )}
  </>
);

export default EmailOtpLogin;
