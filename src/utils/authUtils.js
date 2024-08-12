import { endpoints } from "../api";
import { sendOtp } from "../api/auth";
import axiosInstance from "../api/axiosInstance";
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
  if (response.payload.includes("Invalid ID")) return "Invalid ID number";
  if (response.payload.includes("already exists"))
    return "Email address already exists";
  if (response.payload.includes("OTP has not expired"))
    return "Previously requested OTP has not expired yet";
  if (response.payload.includes("Missing final '@domaind"))
    return "Please verify email address";
  if (response.payload.includes("Provided Otp is redeemed already"))
    return "Provided Otp is already redeemed";
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
  route = "/dashboard",
  setShowResendOtpButton
) => {
  try {
    const response = await verifyOtp(email, otp);

    if (response && response.successful) {
      if (response.payload.validOtpProvided) {
        setSnackbar({
          open: true,
          message: response.payload.message || "OTP verified successfully!",
          severity: "success",
        });
        navigate(route);
      } else {
        setSnackbar({
          open: true,
          message: "Invalid OTP provided.",
          severity: "error",
        });
        setShowResendOtpButton(true);
      }
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

export const checkAuth = async (setSnackbar, navigate) => {
  try {
    const token = getToken();
    const response = await axiosInstance.post(
      endpoints.verifyToken,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      }
    );
    const { successful, payload } = response.data;

    if (successful) {
      if (payload.successful) {
        return { auth: true };
      } else {
        const { notValidReason } = payload.payload;
        navigate("/feedback", {
          state: {
            type: "error",
            message: `Authentication failed: ${notValidReason}`,
          },
        });
        return { auth: false };
      }
    } else {
      navigate("/feedback", {
        state: {
          type: "error",
          message: `Authentication failed: ${payload.message}`,
        },
      });
      return { auth: false };
    }
  } catch (error) {
    console.log("err", error);
    navigate("/feedback", {
      state: {
        type: "error",
        message: "Error verifying token. Please try again.",
      },
    });
    return { auth: false };
  }
};

export const getToken = () => {
  const name = "authToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      const token = c.substring(name.length, c.length);
      return token;
    }
  }
  return "";
};
