import axios from 'axios';

const api = axios.create({
  baseURL: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (credentials) => api.post('/login', credentials);
export const resetPassword = (email) => api.post('/reset-password', { email });

// Example usage
// registerUser({ username: 'JohnDoe', email: 'john.doe@example.com', password: 'password123' });
// loginUser({ email: 'john.doe@example.com', password: 'password123' });
// resetPassword('john.doe@example.com');
