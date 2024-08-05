import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  marginLeft: theme.spacing(1),
}));

const CustomButton = ({ text, color = "primary", disabled, onClick,type,fullWidth,pl,pr, ...otherProps }) => (
  <StyledButton
    variant="contained"
    color={color}
    disabled={disabled}
    onClick={onClick}
    type={type}
    sx={{ paddingLeft: pl, paddingRight: pr }}
    fullWidth={fullWidth}
    {...otherProps}
  >
    {text}
  </StyledButton>
);

export default CustomButton;
