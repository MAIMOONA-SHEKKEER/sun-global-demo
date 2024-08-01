import axiosInstance from './axiosInstance';

export const endpoints = {
  login: '/login',
  createOtp: '/createOtp',
  registerUser: '/registerUser',
  verifyToken: '/verifyToken',
  verifyOtp: '/verifyOtp',
  ping: '/ping',
  resetPassword: '/resetLoginCredentials',
};

export const api = {
  post: (endpoint, data) => axiosInstance.post(endpoint, data),
};
