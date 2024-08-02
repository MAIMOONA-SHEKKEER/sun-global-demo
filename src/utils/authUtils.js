import { sendOtp } from "../api/auth";
import { verifyOtp } from "../api/user";
import { fieldMapping } from "../constants/registerData";

export const generateSnackbarMessage = (response) => {
  if (response.message === "REQUEST_BODY_VALIDATION_ERROR") {
    const fieldsWithErrors = Object.keys(response.payload).map(
      (field) =>
        fieldMapping[field] ||
        field.replace(/Field --> /, "").replace(/([A-Z])/g, " $1")
    );
    const uniqueFields = [...new Set(fieldsWithErrors)];
    return `Please Check ${uniqueFields.join(", ")}`;
  }

  if (response.payload.includes("Email address is not verified"))
    return "Email address is not verified";
  if (response.payload.includes("Invalid credentials provided"))
    return "Invalid Credentials Provided";
  if (response.payload.includes("Invalid ID"))
    return "Invalid ID number";
  if (response.payload.includes("already exists"))
    return "Email address already exists";
  if (response.payload.includes("OTP has not expired"))
    return "Previously requested OTP has not expired yet";
  if (response.payload.includes("Missing final '@domaind"))
    return "Please verify email address";
  if (response.payload.includes("could not execute statement"))
    return "There was a problem with your request. Please check your input.";
  return null;
};

export const handleSendOtp = async (
  email,
  setSnackbar,
  setOtpSent,
  otpType = "email-otp"
) => {
  try {
    const response = await sendOtp(email, otpType);
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

export const handleVerifyOtp = async (
  email,
  otp,
  setSnackbar,
  navigate,
  route = "/dashboard"
) => {
  try {
    const response = await verifyOtp(email, otp);

    if (response.successful) {
      setSnackbar({
        open: true,
        message: "OTP verified successfully!",
        severity: "success",
      });
      navigate(route);
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

export const validateOtp = (otp, setOtpError) => {
  if (!otp || otp.length < 6) {
    setOtpError("OTP must be 6 digits long.");
    return false;
  }
  setOtpError("");
  return true;
};
