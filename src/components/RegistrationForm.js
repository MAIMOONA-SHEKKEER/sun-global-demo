import React, { useState } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import axios from "axios";
import Banner from "./Banner";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", formData);
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="username"
            label="Username"
            required
            fullWidth
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            required
            fullWidth
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            required
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>{" "}
      </Grid>{" "}
      <Banner />
    </Grid>
  );
};

export default RegistrationForm;
