import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledWrapper } from "../styles/StyledComponents";
import { userData } from "../constants/userData";
import { userFields } from "../constants/userFields";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <StyledWrapper>
      <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 6 }}>
        <CardContent>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              {userData.profileImage ? (
                <Avatar
                  alt={userData.name}
                  src={userData.profileImage}
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <Avatar sx={{ p: 1 }}>{userData.name[0]}</Avatar>
              )}
            </Grid>
            <Grid item>
              <Typography variant="h5" component="div" gutterBottom>
                {userData.name}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ m: 2 }} />
          <Grid container spacing={2}>
            {userFields.map((field) => (
              <React.Fragment key={field.value}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="textSecondary">
                    {field.label}:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textPrimary">
                    {userData[field.value]}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </StyledWrapper>
  );
};

export default Dashboard;
