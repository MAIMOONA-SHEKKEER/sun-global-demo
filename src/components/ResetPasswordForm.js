import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import {
  CustomizedText,
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
        <CustomizedText>Reset Password</CustomizedText>
        <Box component="form" p={2} width={600} onSubmit={handleSubmit}>
          <CustomTextField
            required
            id="email"
            label="Email Address"
            type="text"
            placeholder="Enter your Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <SubmitButton text='Reset'/>
        </Box>

      </StyledGrid>
      <Banner />
    </Grid>
  );
};

export default ResetPasswordForm;
