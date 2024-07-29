import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  // Replace with actual user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    accountDetails: 'Premium User'
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1">Name: {userData.name}</Typography>
      <Typography variant="body1">Email: {userData.email}</Typography>
      <Typography variant="body1">Address: {userData.address}</Typography>
      <Typography variant="body1">Account Details: {userData.accountDetails}</Typography>
    </Box>
  );
};

export default Dashboard;
