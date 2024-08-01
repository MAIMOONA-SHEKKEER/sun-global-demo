import { api, endpoints } from './index';
import { handleApiError } from '../utils/apiUtils';

export const registerUser = async (userDetails) => {
  try {
    const response = await api.post(endpoints.registerUser, userDetails);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await api.post(endpoints.verifyToken, { token });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post(endpoints.verifyOtp, {
      combination: 'email-otp',
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
