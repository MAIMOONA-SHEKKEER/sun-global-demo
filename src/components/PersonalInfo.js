import { Divider, Grid } from "@mui/material";
import React from "react";
import theme from "../styles/Theme";
import { userData } from "../constants/userData";
import { CustomText } from "../styles/components/CustomText";

const PersonalInfo = ({ userFields }) => {
  return (
    <>
      <Divider sx={{ m: 2 }} />
      <Grid container spacing={4}>
        {userFields.map((field) => (
          <React.Fragment key={field.value}>
            <Grid item xs={4}>
              <CustomText color={theme.palette.primary.light}>
                {field.label}:
              </CustomText>
            </Grid>
            <Grid item xs={8}>
              <CustomText>{userData[field.value]}</CustomText>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

export default PersonalInfo;
