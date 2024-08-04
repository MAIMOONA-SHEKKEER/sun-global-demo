import React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
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
  VisibilityOff,
  Visibility,
  Person,
} from "@mui/icons-material";

const RedAsterisk = styled("span")({
  color: "red",
});

const CustomTextField = ({
  type,
  label,
  required,
  fullWidth,
  onClick,
  showPassword,
  error,
  ...props
}) => {
  const getAdornment = () => {
    switch (type) {
      case "password":
      case "password-visible":
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
            <Person />
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
      error={error}
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
  justifyContent: "flex-start",
  padding: theme.spacing(10),
}));

const StyledWrapper = styled(Box)({
  padding: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
  backgroundColor: "#f5f5f5",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  padding: 10,
  backgroundColor: theme.palette.primary.main,
  margin: 10,
  color: theme.palette.primary.contrastText,
}));

const CustomButton = ({
  text,
  color = "primary",
  disabled,
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
      fullWidth
      variant="contained"
      color={color}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    >
      {text}
    </StyledButton>
  );
};

const LoadingIndicator = styled(CircularProgress)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: "-12px",
  marginLeft: "-12px",
}));

const SubmitButton = ({
  text,
  color = "primary",
  disabled,
  fullWidth,
  pl,
  pr,
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
      sx={{ paddingLeft: pl, paddingRight: pr }}
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

const CustomText = styled(Typography)(({ theme, fontSize = 18, color }) => ({
  color: color ?? theme.palette.primary.main,
  fontFamily: "initial",
  fontSize: fontSize,
  wordWrap: "break-word",
  textAlign: "start",
  marginLeft: 10,
  padding: 5,
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

export {
  RedAsterisk,
  CustomTextField,
  StyledGrid,
  StyledCardContent,
  SubmitButton,
  CustomText,
  StyledLink,
  CustomSnackbar,
  StyledWrapper,
  StyledAvatar,
  LoadingIndicator,
  CustomButton,
};
