import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reset-password', { email });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField name="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit" variant="contained">Reset Password</Button>
    </Box>
  );
};

export default ResetPasswordForm;
