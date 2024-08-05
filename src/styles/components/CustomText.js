import { styled, Typography } from "@mui/material";

export const CustomText = styled(Typography)(({ theme, fontSize = 18, color }) => ({
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
  
