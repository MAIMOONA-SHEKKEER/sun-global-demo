import React from "react";
import {
  Box,
  Grid,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import useRegistrationForm from "../hooks/useRegistrationForm";
import { CustomHeader, CustomTextField, StyledGrid, StyledLink, SubmitButton } from "../styles/StyledComponents";
import Banner from "./Banner";
import { userRoles } from "../constants/user";

const initialFormState = {
  fullName: "",
  lastname: "",
  mobileNumber: "",
  passportNumber: "",
  password: "",
  userRole: "",
  username: "",
  idNumber: "",
};

const RegistrationForm = () => {
  const {
    formData,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSnackbarClose,
  } = useRegistrationForm(initialFormState);

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <CustomHeader>Registration Form</CustomHeader>
        <Box component="form" p={5} maxWidth={550} onSubmit={handleSubmit}>
          <CustomTextField
            id="fullName"
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            helperText={errors.fullName}
          />
          <CustomTextField
            id="lastname"
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            error={errors.lastname}
            helperText={errors.lastname}
          />
          <CustomTextField
            id="mobileNumber"
            label="Mobile Number"
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            error={errors.mobileNumber}
            helperText={errors.mobileNumber}
          />
          <CustomTextField
            id="passportNumber"
            label="Passport Number"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            error={errors.passportNumber}
            helperText={errors.passportNumber}
          />
          <CustomTextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password}
          />
          <CustomTextField
            id="username"
            label="Email Address"
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            helperText={errors.username}
          />
          <CustomTextField
            id="idNumber"
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            error={errors.idNumber}
            helperText={errors.idNumber}
          />
          <FormControl sx={{ width: 275 }} error={!!errors.userRole}>
            <InputLabel id="userRole-label">User Role</InputLabel>
            <Select
              labelId="userRole-label"
              id="userRole"
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              label="User Role"
              sx={{ m: 1 }}
              required
            >
              {userRoles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
            {!!errors.userRole && <FormHelperText>{errors.userRole}</FormHelperText>}
          </FormControl>
          <SubmitButton text="Register" width={520} />
          <StyledLink href="/login">Already have an account? Login here</StyledLink>
        </Box>
      </StyledGrid>
      <Banner />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default RegistrationForm;
