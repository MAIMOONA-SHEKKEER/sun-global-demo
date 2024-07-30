import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import {
  CustomizedText,
  CustomTextField,
  StyledGrid,
  SubmitButton,
} from "../styles/StyledComponents";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <CustomizedText>Registration Form</CustomizedText>
        <Box component="form" p={5} width={600} onSubmit={handleSubmit}>
          <CustomTextField
            required
            id="username"
            label="Name"
            type="text"
            placeholder="Enter your Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <CustomTextField
            required
            id="email"
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your current password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="number"
            label="Mobile Number"
            type="number"
            placeholder="Enter your phone number"
            id="number"
            value={formData.number}
            onChange={handleChange}
          />
          <SubmitButton text='Register'/>
          <Link to="/" variant="body2">
            Already have an account? Login here
          </Link>
        </Box>
      </StyledGrid>
      <Banner />
    </Grid>
  );
};

export default RegistrationForm;
