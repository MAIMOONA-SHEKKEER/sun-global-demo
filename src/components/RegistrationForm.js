import React, { useState } from "react";
import {
  Box,
  Grid,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { registerUser } from "../api/apiService";
import {
  CustomHeader,
  CustomTextField,
  StyledGrid,
  StyledLink,
  SubmitButton,
} from "../styles/StyledComponents";
import Banner from "./Banner";
import { userRoles } from "../constants/user";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    mobileNumber: "",
    passportNumber: "",
    password: "",
    userRole: "",
    username: "",
    idNumber: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, userRole: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      setSnackbarMessage('Registration successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      console.log('response', result);
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.response) {
        console.error('Error response data:', error.response.data);
        setSnackbarMessage(error.response.data.message || 'Registration failed.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setSnackbarMessage('No response received from the server.');
      } else {
        console.error('Error message:', error.message);
        setSnackbarMessage('An unexpected error occurred.');
      }

      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <CustomHeader>Registration Form</CustomHeader>
        <Box component="form" p={5} width={550} onSubmit={handleSubmit}>
          <CustomTextField
            required
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <CustomTextField
            required
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <CustomTextField
            required
            id="mobileNumber"
            label="Mobile Number"
            type="number"
            placeholder="Enter your mobile number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <CustomTextField
            required
            id="passportNumber"
            label="Passport Number"
            placeholder="Enter your passport number"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
          />
          <CustomTextField
            required
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <CustomTextField
            required
            id="username"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <CustomTextField
            required
            id="idNumber"
            label="ID Number"
            placeholder="Enter your ID number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
          <FormControl sx={{ width: 275 }}>
            <InputLabel id="userRole-label">User Role</InputLabel>
            <Select
              labelId="userRole-label"
              id="userRole"
              name="userRole"
              value={formData.userRole}
              onChange={handleRoleChange}
              label="User Role"
              sx={{ m: 1 }}
            >
              {userRoles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <SubmitButton text="Register" width={520} />
          <StyledLink href="/login" variant="body2">
            Already have an account? Login here
          </StyledLink>
        </Box>
      </StyledGrid>
      <Banner />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default RegistrationForm;
