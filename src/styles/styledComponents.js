import React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  Link,
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

const RedAsterisk = styled("span")(() => ({
  color: "red",
}));

export const CustomHeader = styled((props) => {
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

export const CustomTextField = ({
  type,
  label,
  required,
  fullWidth,
  ...props
}) => {
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
  justifyContent: "center",
}));

export const StyledCardContent = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(5),
}));

export const SubmitButton = ({
  text,
  color,
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
      color={color || "primary"}
      disabled={disabled}
      onClick={onClick}
      type="submit"
      {...otherProps}
    >
      {text}
    </StyledButton>
  );
};

export const CustomText = styled((props) => {
  const { fontSize, fontColor, font, ...other } = props;
  return <Typography m={2} {...other} />;
})(({ theme, fontSize = 18, fontColor, font }) => ({
  color: fontColor ?? theme.palette.primary.main,
  fontFamily: font ?? theme,
  fontSize: fontSize,
  wordWrap: "break-word",
  textAlign: "center",
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

export const StyledLink = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
}));
