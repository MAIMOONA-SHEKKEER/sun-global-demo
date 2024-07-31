import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import {
  CustomHeader,
  CustomTextField,
  StyledGrid,
  SubmitButton,
} from "../styles/StyledComponents";
import Banner from "./Banner";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/reset-password", { email });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <CustomHeader>Reset Password</CustomHeader>
        <Box component="form" p={2} width={360} onSubmit={handleSubmit}>
          <CustomTextField
            fullWidth
            required
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitButton text="Reset" fullWidth />
        </Box>
      </StyledGrid>
      <Banner />
    </Grid>
  );
};

export default ResetPasswordForm;
