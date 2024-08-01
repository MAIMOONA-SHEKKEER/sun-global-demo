import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  Link,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  Phone,
  Email,
  Lock,
  VisibilityOff,
  Visibility,
  AccountCircle,
} from "@mui/icons-material";

const RedAsterisk = styled("span")({
  color: "red",
});

const CustomHeader = styled(Typography)(({ theme, fontSize = 25, fontColor, font }) => ({
  color: fontColor ?? theme.palette.primary.main,
  fontFamily: "initial",
  fontSize: fontSize,
  wordWrap: "break-word",
  textAlign: "start",
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

const CustomTextField = ({
  type,
  label,
  required,
  fullWidth,
  onClick,
  showPassword,
  ...props
}) => {
  const getAdornment = () => {
    switch (type) {
      case "password":
        return (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
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
            <Email />
          </InputAdornment>
        );
      case "number":
        return (
          <InputAdornment position="start">
            <Phone />
          </InputAdornment>
        );
      default:
        return (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        );
    }
  };

  return (
    <TextField
      {...props}
      type={type}
      autoFocus
      fullWidth={fullWidth}
      margin="normal"
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
      sx={{ m: 1 }}
    />
  );
};

const StyledGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "start",
});

const StyledCardContent = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(5),
}));

const SubmitButton = ({
  text,
  color = "primary",
  disabled,
  fullWidth,
  width,
  onClick,
  ...otherProps
}) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }));

  return (
    <StyledButton
      sx={{ width: width }}
      fullWidth={fullWidth}
      variant="contained"
      color={color}
      disabled={disabled}
      onClick={onClick}
      type="submit"
      {...otherProps}
    >
      {text}
    </StyledButton>
  );
};

const CustomText = styled(Typography)(({ theme, fontSize = 18, fontColor, font }) => ({
  color: fontColor ?? theme.palette.primary.main,
  fontFamily: "initial",
  fontSize: fontSize,
  wordWrap: "break-word",
  textAlign: "start",
  marginLeft: 10,
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

const StyledLink = styled(Link)({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  cursor: "pointer",
  fontFamily: "initial",
  textDecoration: "none",
  marginTop: 5,
  marginLeft: 10,
});

const CustomSnackbar = ({ open, message, severity, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

const StyledWrapper = styled(Box)({
  padding: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
});

export {
  RedAsterisk,
  CustomHeader,
  CustomTextField,
  StyledGrid,
  StyledCardContent,
  SubmitButton,
  CustomText,
  StyledLink,
  CustomSnackbar,
  StyledWrapper,
};
