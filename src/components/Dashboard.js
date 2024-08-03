import React from "react";
import { Card, CardContent, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  CustomText,
  StyledAvatar,
  StyledWrapper,
} from "../styles/StyledComponents";
import { userData } from "../constants/userData";
import { userFields } from "../constants/userFields";
import PersonalInfo from "./PersonalInfo";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
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
                <StyledAvatar alt={userData.name} src={userData.profileImage} />
              ) : (
                <StyledAvatar>{userData.name[0]}</StyledAvatar>
              )}
            </Grid>
            <Grid item>
              <CustomText fontSize={25}>{userData.name}</CustomText>
            </Grid>
          </Grid>
          <PersonalInfo userFields={userFields} />
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
