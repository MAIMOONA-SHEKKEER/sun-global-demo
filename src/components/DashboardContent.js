import React from "react";
import { Box, Card, CardContent, Grid, Divider, Toolbar } from "@mui/material";
import { userData } from "../constants/userData";
import { userFields } from "../constants/userFields";
import PersonalInfo from "./PersonalInfo";
import { CustomText } from "../styles/components/CustomText";
import StyledAvatar from "../styles/components/StyledAvatar";
import CustomButton from "../styles/components/CustomButton";
import StyledWrapper from "../styles/components/StyledWrapper";
import StyledGrid from "../styles/components/StyledGrid";

const DashboardContent = ({ drawerWidth, handleLogout }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { xs: `100%`, sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        transition: "margin-left 0.3s",
      }}
    >
      <Toolbar />
      <StyledWrapper>
        <Card sx={{ maxWidth: 800, width: "100%", boxShadow: 6, p: 3 }}>
          <CardContent>
            <StyledGrid>
              <Grid item>
                {userData.profileImage ? (
                  <StyledAvatar
                    alt={userData.name}
                    src={userData.profileImage}
                  />
                ) : (
                  <StyledAvatar sx={{ width: 80, height: 80 }}>
                    {userData.name[0]}
                  </StyledAvatar>
                )}
              </Grid>
              <Grid item>
                <CustomText fontSize={50}>{userData.name}</CustomText>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ mb: 3 }}>
                <CustomText fontSize={30}>Personal Information</CustomText>
                <PersonalInfo userFields={userFields} />
              </Box>
              <Divider sx={{ my: 3 }} />
              <CustomButton
                text="Logout"
                onClick={handleLogout}
                sx={{ mt: 3 }}
              />
            </StyledGrid>
          </CardContent>
        </Card>
      </StyledWrapper>
    </Box>
  );
};

export default DashboardContent;
