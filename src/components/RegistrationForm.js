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
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import useRegistrationForm from "../hooks/useRegistrationForm";
import {
  CustomText,
  CustomTextField,
  StyledGrid,
  StyledLink,
  SubmitButton,
} from "../styles/StyledComponents";
import Banner from "./Banner";
import { userRoles } from "../constants/user";
import { fieldMapping } from "../constants/registerData";

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
    loading,
    handleChange,
    handleSubmit,
    handleSnackbarClose,
    handleRoleChange,
  } = useRegistrationForm(initialFormState);
  const [showPasswords, setShowPasswords] = useState({});

  const handleClickShowPassword = (field) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <StyledGrid item xs={12} md={6}>
        <Box component="form" p={5} ml={12} mr={12} onSubmit={handleSubmit}>
          <CustomText fontSize={25} mb={2}>
            Registration Form
          </CustomText>
          {Object.keys(formData)
            .filter((field) => field !== "userRole")
            .map((field) => {
              const fieldType =
                {
                  password: showPasswords[field] ? "password-visible" : "password",
                  mobileNumber: "number",
                  username: "email",
                }[field] || "text";

              return (
                <CustomTextField
                  key={field}
                  required
                  id={field}
                  label={
                    fieldMapping[field] || field.replace(/([A-Z])/g, " $1")
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  error={!!errors[field]}
                  helperText={errors[field] || ""}
                  type={fieldType}
                  showPassword={showPasswords[field]}
                  onClick={() => handleClickShowPassword(field)}
                />
              );
            })}
          <FormControl sx={{ width: 275 }} error={!!errors.userRole}>
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
            {!!errors.userRole && (
              <FormHelperText>{errors.userRole}</FormHelperText>
            )}
          </FormControl>
          <SubmitButton
            text={loading ? <CircularProgress size={24} /> : "Register"}
            pl={12}
            pr={12}
            disabled={loading}
          />
          <StyledLink href="/login">
            Already have an account? Login here
          </StyledLink>
        </Box>
      </StyledGrid>
      <Banner />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default RegistrationForm;
