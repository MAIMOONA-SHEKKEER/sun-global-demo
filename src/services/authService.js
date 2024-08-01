import { loginUser, sendOtp, resetPassword } from '../api/auth';

export const authenticateUser = async (loginMethod, credentials) => {
  try {
    return await loginUser(loginMethod, credentials);
  } catch (error) {
    console.error('Authentication failed', error);
    throw error;
  }
};

export const requestOtp = async (email) => {
  try {
    return await sendOtp(email);
  } catch (error) {
    console.error('Failed to send OTP', error);
    throw error;
  }
};

export const changePassword = async (email, newPassword, otp) => {
  try {
    return await resetPassword(email, newPassword, otp);
  } catch (error) {
    console.error('Failed to reset password', error);
    throw error;
  }
};
