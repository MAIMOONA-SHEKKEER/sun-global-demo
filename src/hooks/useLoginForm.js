import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import {
  generateSnackbarMessage,
  handleSendOtp,
  handleVerifyOtp,
  validateOtp,
} from "../utils/authUtils";
import { validateEmail, validatePassword } from "../utils/validators";

export const useLoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [loginMethod, setLoginMethod] = useState("email-password");
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

  const handleOtpChange = (otp) => {
    setCredentials((prev) => ({ ...prev, otp }));
    if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(credentials.email))
      newErrors.email = "Invalid email address";
    if (!validatePassword(credentials.password))
      newErrors.password = "Password must be at least 6 characters long";
    if (!credentials.email) newErrors.email = "Email is required";
    if (loginMethod === "email-password" && !credentials.password) {
      newErrors.password = "Password is required";
    }
    if (loginMethod === "email-otp" && !credentials.otp && otpSent) {
      newErrors.otp = "OTP is required";
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
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(loginMethod, credentials);

      if (response.successful) {
        setSnackbar({
          open: true,
          message: "Login Successful",
          severity: "success",
        });
        navigate("/dashboard");
      } else {
        const errorMessage = generateSnackbarMessage(response);
        setSnackbar({
          open: true,
          message: errorMessage || "Login failed. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Login failed. Please try again.",
        severity: "error",
      });
    }
  };

  const onVerifyOtpClick = () => {
    if (validateOtp(credentials.otp, setOtpError)) {
      setLoading(true);
      handleVerifyOtp(
        credentials.email,
        credentials.otp,
        setSnackbar,
        navigate
      ).finally(() => setLoading(false));
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod((prev) =>
      prev === "email-password" ? "email-otp" : "email-password"
    );
    setOtpSent(false);
  };

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return {
    credentials,
    loginMethod,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleOtpChange,
    handleSubmit,
    handleSendOtp: () =>
      handleSendOtp(credentials.email, setSnackbar, setOtpSent),
    toggleLoginMethod,
    handleSnackbarClose,
    onVerifyOtpClick,
    otpError,
    loading,
    setErrors,
  };
};
