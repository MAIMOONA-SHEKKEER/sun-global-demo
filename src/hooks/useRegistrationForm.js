import { useState } from "react";
import { registerUser } from "../api/user";
import { validateEmail, validateMobile, validatePassword } from "../utils/validators";
import { fieldMapping } from "../constants/registerData";
import { generateSnackbarMessage } from "../utils/authUtils";

const useRegistrationForm = (initialState) => {
  const [formData, setFormData] = useState({
    fullName: "",
    lastname: "",
    mobileNumber: "",
    passportNumber: "",
    password: "",
    userRole: "",
    username: "",
    idNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (errors[name]) {
      setErrors((prevState) => ({ ...prevState, [name]: "" }));
    }
  };

  const handleRoleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, userRole: e.target.value }));
    if (errors.userRole) {
      setErrors((prevState) => ({ ...prevState, userRole: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key === 'email' && !validateEmail(formData[key])) {
        newErrors[key] = "Invalid email address";
      } else if (key === 'password' && !validatePassword(formData[key])) {
        newErrors[key] = "Password must be at least 6 characters long";
      } else if (key === 'mobile' && !validateMobile(formData[key])) {
        newErrors[key] = "Mobile number must be between 10 to 15 digits";
      } else if (!formData[key]) {
        newErrors[key] = `${fieldMapping[key] || key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      handleRegistration();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRegistration = async () => {
    setLoading(true);
    try {
      const response = await registerUser(formData);
      if (response.successful) {
        setSnackbar({
          open: true,
          message: 'Registration successful!',
          severity: 'success',
        });
      } else {
        const errorMessage = generateSnackbarMessage(response);
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Registration failed. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(false);
  };


  return {
    formData,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSnackbarClose,
    handleRoleChange,loading
  };
};

export default useRegistrationForm;
