import React from "react";
import { CustomText, CustomTextField, StyledLink, SubmitButton } from "../styles/StyledComponents";

const EmailPasswordLogin = ({
  credentials,
  handleChange,
  toggleLoginMethod,
}) => (
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
    <CustomTextField
      fullWidth
      required
      name="password"
      label="Password"
      type="password"
      id="password"
      value={credentials.password}
      onChange={handleChange}
    />
    <StyledLink href="/reset-password" variant="body2">
      Forgot your password?
    </StyledLink>
    <SubmitButton text="Login" fullWidth />
    <CustomText>Or</CustomText>
    <StyledLink
      onClick={toggleLoginMethod}
      variant="body2"
      sx={{ cursor: "pointer" }}
    >
      Do you want to login using OTP?
    </StyledLink>
  </>
);

export default EmailPasswordLogin;
