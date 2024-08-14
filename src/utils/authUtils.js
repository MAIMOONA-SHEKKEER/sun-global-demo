import { endpoints } from "../api";
import { sendOtp } from "../api/auth";
import axiosInstance from "../api/axiosInstance";
import { verifyOtp } from "../api/user";
import { messagesMapping } from "../constants/messageMapping";
import { fieldMapping } from "../constants/registerData";

export const generateSnackbarMessage = (response) => {
  if (!response || !response.payload) {
    return "An unknown error occurred";
  }
  if (response.message === "REQUEST_BODY_VALIDATION_ERROR") {
    const fieldsWithErrors = Object.keys(response.payload).map(
      (field) =>
        fieldMapping[field] ||
        field.replace(/Field --> /, "").replace(/([A-Z])/g, " $1")
    );
    const uniqueFields = [...new Set(fieldsWithErrors)];
    return `Please check ${uniqueFields.join(", ")}`;
  }

  const payload = response.payload || "";

  for (const [key, value] of Object.entries(messagesMapping)) {
    if (payload.includes(key)) return value;
  }

  return "An error occurred. Please try again.";
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
        setTimeout(() => {
          navigate(route);
        }, 2000);
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
      message: "No authentication token found. Please log in again.",
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
