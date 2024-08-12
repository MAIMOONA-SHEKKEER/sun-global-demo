import { registerUser } from '../api/user';

export const createUser = async (userDetails) => {
  try {
    return await registerUser(userDetails);
  } catch (error) {
    console.error('Failed to register user', error);
    throw error;
  }
};

