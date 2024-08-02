import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleSendOtp,
  validateOtp,
  generateSnackbarMessage,
} from "../utils/authUtils";
import { resetPassword } from "../api/auth";
import { validateEmail } from "../utils/validators";

export const useResetPasswordForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOtpChange = (value) => {
    setCredentials(prev => ({
      ...prev,
      otp: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(credentials.email))
      newErrors.email = "Invalid email address";
    if (!credentials.email) newErrors.email = "Email is required";
    if (!credentials.otp) newErrors.otp = "OTP is required";
    if (!credentials.newPassword)
      newErrors.newPassword = "New password is required";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleResetPassword();
  };

  const handleResetPassword = async () => {
    if (validateOtp(credentials.otp, setOtpError)) {
      setLoading(true);
      try {
        const resetResponse = await resetPassword({
          email: credentials.email,
          newPassword: credentials.newPassword,
          otp: credentials.otp,
        });

        if (resetResponse.successful) {
          setSnackbar({
            open: true,
            message: "Password reset successfully.",
            severity: "success",
          });
          navigate("/login");
        } else {
          const errorMessage = generateSnackbarMessage(resetResponse);
          setSnackbar({
            open: true,
            message:
              errorMessage || "Failed to reset password. Please try again.",
            severity: "error",
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || "An error occurred. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setSnackbar({
        open: true,
        message: "Invalid OTP. Please try again.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return {
    credentials,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSendOtp: () =>
      handleSendOtp(credentials.email, setSnackbar, setOtpSent),
    handleSnackbarClose,
    otpError,
    loading,
    handleOtpChange
  };
};
