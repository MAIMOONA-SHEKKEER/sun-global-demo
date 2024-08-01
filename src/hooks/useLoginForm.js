import { useState } from "react";
import { loginUser, sendOtp } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { fieldMapping } from "../constants/registerData";
import { verifyOtp } from "../api/user";

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

  const generateSnackbarMessage = (response) => {
    if (response.message === "REQUEST_BODY_VALIDATION_ERROR") {
      const fieldsWithErrors = Object.keys(response.payload).map(
        (field) =>
          fieldMapping[field] ||
          field.replace(/Field --> /, "").replace(/([A-Z])/g, " $1")
      );
      const uniqueFields = [...new Set(fieldsWithErrors)];
      return `Please check ${uniqueFields.join(", ")}`;
    }

    if (response.payload.includes("Email address is not verified"))
      return "Email address is not verified";
    if (response.payload.includes("Invalid credentials provided"))
      return "Invalid Credentials Provided";
    if (response.payload.includes("OTP has not expired"))
      return "Previously requested OTP has not expired yet";

    return null;
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
          message: errorMessage,
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

  const handleSendOtp = async () => {
    try {
      const response = await sendOtp(credentials.email, "email-otp");
      if (response.successful) {
        setSnackbar({
          open: true,
          message: "OTP sent to your email!",
          severity: "success",
        });
        setOtpSent(true);
      } else {
        const errorMessage = generateSnackbarMessage(response);
        setSnackbar({
          open: true,
          message: errorMessage || "Failed to send OTP.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send OTP.",
        severity: "error",
      });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(credentials.email, credentials.otp);

      if (response.successful) {
        setSnackbar({
          open: true,
          message: "OTP verified successfully!",
          severity: "success",
        });
        navigate("/dashboard");
      } else {
        setSnackbar({
          open: true,
          message: generateSnackbarMessage(response),
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "OTP verification failed. Please try again.",
        severity: "error",
      });
    }
  };

  const validateOtp = () => {
    if (!credentials.otp || credentials.otp.length < 6) {
      setOtpError("OTP must be 6 digits long.");
      return false;
    }
    setOtpError("");
    return true;
  };

  const onVerifyOtpClick = () => {
    if (validateOtp()) {
      setLoading(true); // Set loading to true when verification starts
      handleVerifyOtp().finally(() => setLoading(false)); // Set loading to false when verification completes
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
    handleSendOtp,
    toggleLoginMethod,
    handleSnackbarClose,
    onVerifyOtpClick,
    otpError,
    loading,
  };
};
