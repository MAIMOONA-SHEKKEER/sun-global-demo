import React, { useState } from "react";
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
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
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
        type={showPassword ? "password-visible" : "password"}
        id="password"
        value={credentials.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        showPassword={showPassword}
        onClick={handleClickShowPassword}
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
};

export default EmailPasswordLogin;
