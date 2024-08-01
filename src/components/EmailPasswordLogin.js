import React from "react";
import {
  CustomTextField,
  StyledLink,
  SubmitButton,
} from "../styles/StyledComponents";

const EmailPasswordLogin = ({
  credentials,
  handleChange,
  toggleLoginMethod,
  errors,
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
      error={!!errors.email}
      helperText={errors.email}
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
      error={!!errors.password}
      helperText={errors.password}
    />
    <StyledLink href="/reset-password" variant="body2">
      Forgot your password?
    </StyledLink>
    <SubmitButton text="Login" fullWidth />
    <StyledLink onClick={toggleLoginMethod}>
      Do you want to login using OTP?
    </StyledLink>
  </>
);

export default EmailPasswordLogin;
