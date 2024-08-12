import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <CircularProgress
      style={{ display: "block", margin: "auto", marginTop: "20%" }}
    />
  );
};

export default LoadingIndicator;
