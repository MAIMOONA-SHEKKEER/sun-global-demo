import { useState } from "react";
import { registerUser } from "../api/user";
import { fieldMapping } from "../constants/registerData";
import { validateEmail, validatePassword, validateMobile } from "../utils/validators";

const useRegistrationForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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

  const generateErrorMessage = (response) => {
    if (response.message === "REQUEST_BODY_VALIDATION_ERROR") {
      const fieldsWithErrors = Object.keys(response.payload).map(
        (field) => fieldMapping[field] || field.replace(/Field --> /, "").replace(/([A-Z])/g, " $1")
      );
      const uniqueFields = [...new Set(fieldsWithErrors)];
      return `Please check ${uniqueFields.join(", ")}`;
    }
    
    if (response.payload.includes("already exists")) return "Email already registered";
    if (response.payload.includes("Invalid ID")) return "Invalid ID number";
    if (response.payload.includes("Email address is not verified")) return "Email address is not verified";
    if (response.payload.includes("invalid email")) return "Invalid email address";
    
    return response.message || "Registration failed.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.successful) {
        setSnackbar({
          open: true,
          message: "Registration successful!",
          severity: "success",
        });
      } else {
        const errorMessage = generateErrorMessage(response);
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Registration failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return {
    formData,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSnackbarClose,
  };
};

export default useRegistrationForm;
