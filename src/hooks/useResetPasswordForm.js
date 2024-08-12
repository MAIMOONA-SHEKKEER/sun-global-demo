import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleSendOtp,
  generateSnackbarMessage,
  validateOtp,
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
  const [showResendOtpButton, setShowResendOtpButton] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOtpChange = (value) => {
    setCredentials((prev) => ({ ...prev, otp: value }));

    if (otpError) {
      setOtpError("");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!credentials.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(credentials.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (otpSent && !credentials.otp) {
      newErrors.otp = "OTP is required.";
    }
    if (otpSent && !credentials.newPassword) {
      newErrors.newPassword = "New password is required.";
    }

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
    if (!validateOtp(credentials.otp, setOtpError)) {
      setSnackbar({
        open: true,
        message: "Invalid OTP. Please try again.",
        severity: "error",
      });
      setShowResendOtpButton(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const resetResponse = await resetPassword({
        email: credentials.email,
        newPassword: credentials.newPassword,
        otp: credentials.otp,
      });

      if (resetResponse && resetResponse.successful) {
        if (resetResponse.payload.success) {
          setSnackbar({
            open: true,
            message: "Password reset successfully.",
            severity: "success",
          });
          navigate("/feedback", {
            state: {
              type: "success",
              message: "Password reset successfully!",
            },
          });
        } else {
          setSnackbar({
            open: true,
            message: "Invalid OTP provided.",
            severity: "error",
          });
          setShowResendOtpButton(true);
        }
      } else {
        const errorMessage =
          generateSnackbarMessage(resetResponse) ||
          "Failed to reset password. Please try again.";
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });
        if (errorMessage.includes("invalid")) {
          setShowResendOtpButton(true);
        }
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
  };

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const onResendOtpClick = () => {
    setLoading(true);
    handleSendOtp(credentials.email, setSnackbar, setOtpSent).finally(() => {
      setLoading(false);
      setShowResendOtpButton(false);
    });
  };

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
    handleOtpChange,
    showResendOtpButton,
    onResendOtpClick,
  };
};
