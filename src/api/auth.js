import { handleApiError } from "../utils/apiUtils";
import { api, endpoints } from "./index";

export const loginUser = async (loginMethod, credentials) => {
  try {
    const payload = {
      combination: loginMethod,
      email: credentials.email,
      ...(loginMethod === "email-password"
        ? { password: credentials.password }
        : {}),
      ...(loginMethod === "email-otp" ? { otp: credentials.otp } : {}),
    };

    const response = await api.post(endpoints.login, payload);
    const token = response.data.payload.token;

    document.cookie = `authToken=${token}; path=/; secure; samesite=strict;`;

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendOtp = async (email, combination) => {
  try {
    const response = await api.post(endpoints.createOtp, {
      combination,
      email,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const resetPassword = async ({ email, newPassword, otp }) => {
  try {
    const response = await api.post(endpoints.resetPassword, {
      email,
      newPassword,
      otp,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyToken = async () => {
  try {
    const response = await api.get(endpoints.verifyToken);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
