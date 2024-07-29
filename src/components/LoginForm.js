import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
  styled,
  Grid,
  Avatar,
  CssBaseline,
} from "@mui/material";
import axios from "axios";
import { FormTextField, FormWrapper } from "../styles/styledComponents";
import { Google as GoogleIcon } from "@mui/icons-material";
import Banner from "./Banner";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", credentials);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          gap: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
        <Typography component="h1" variant="h5">
          Welcome back!
        </Typography>
        <Box component="form" noValidate sx={{ mt: 4 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Grid item xs>
            <Link href="/reset-password" variant="body2">
              Forgot your password?
            </Link>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 4 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Register here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Banner />
    </Grid>
  );
};

export default LoginForm;
