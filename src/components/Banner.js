import React from "react";
import { Grid } from "@mui/material";
import bannerImage from "../assets/banner.png";

const Banner = () => {
  return (
    <Grid
      item
      xs={12}
      md={5}
      sx={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: 2,
        margin: 5,
      }}
    />
  );
};

export default Banner;
