import axiosInstance from './axiosInstance';

export const loginUser = async (loginMethod, credentials) => {
  try {
    const payload = {
      combination: loginMethod,
      email: credentials.email,
    };

    if (loginMethod === 'email-password') {
      payload.password = credentials.password;
    } else if (loginMethod === 'email-otp') {
      payload.otp = credentials.otp;
    }

    const response = await axiosInstance.post('/login', payload);
    const token = response.data.token;
    if (token) {
      localStorage.setItem('authToken', token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendOtp = async (email) => {
    try {
      const response = await axiosInstance.post('/createOtp', {
        combination: 'email-otp',
        email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const registerUser = async (userDetails) => {
    try {
      const response = await axiosInstance.post('/registerUser', userDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  