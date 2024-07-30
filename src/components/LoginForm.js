import React, { useState } from "react";
import { Box, Link, Grid, Avatar } from "@mui/material";
import axios from "axios";
import {
  CustomizedText,
  CustomTextField,
  StyledGrid,
  SubmitButton,
} from "../styles/StyledComponents";
import Banner from "./Banner";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", credentials);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
        <CustomizedText>Welcome back!</CustomizedText>
        <Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmit}>
          <CustomTextField
            placeholder="Enter your email address"
            required
            id="email"
            label="Email Address"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <CustomTextField
            required
            placeholder="Enter your current password"
            name="password"
            label="Password"
            type="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Grid item xs>
            <Link href="/reset-password" variant="body2">
              Forgot your password?
            </Link>
          </Grid>
          <SubmitButton text='Login' />
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Register here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </StyledGrid>
      <Banner />
    </Grid>
  );
};

export default LoginForm;
