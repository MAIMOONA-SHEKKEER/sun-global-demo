import React from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import { Phone } from "@mui/icons-material";

const RedAsterisk = styled("span")(() => ({
  color: "red",
}));

export const CustomizedText = styled((props) => {
  const { fontSize, fontColor, font, ...other } = props;
  return <Typography mt={5} {...other} />;
})(({ theme, fontSize = 25, fontColor, font }) => ({
  color: fontColor ?? theme.palette.primary.main,
  fontFamily: font ?? theme,
  fontSize: fontSize,
  wordWrap: "break-word",
  [theme.breakpoints.down("xl")]: {
    fontSize: fontSize - 2,
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: fontSize - 4,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: fontSize - 6,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: fontSize - 8,
  },
}));

export const CustomTextField = ({ type, label, required, ...props }) => {
  const getAdornment = () => {
    switch (type) {
      case "password":
        return (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.onClick}
              edge="end"
            >
              {props.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        );
      case "text":
        return (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        );
      case "email":
        return (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        );
      case "number":
        return (
          <InputAdornment position="start">
            <Phone />
          </InputAdornment>
        );
      default:
        return null;
    }
  };

  return (
    <TextField
      {...props}
      type={type}
      fullWidth
      autoFocus
      label={
        required ? (
          <>
            {label} <RedAsterisk>*</RedAsterisk>
          </>
        ) : (
          label
        )
      }
      InputProps={{
        endAdornment: getAdornment(),
      }}
      sx={{ mb: 5 }}
    />
  );
};

export const FormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(8),
  gap: theme.spacing(2),
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
}));

export const SubmitButton = ({ text }) => (
  <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 4 }}>
    {text}
  </Button>
);
