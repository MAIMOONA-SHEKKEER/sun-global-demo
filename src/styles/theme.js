import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#508C9B",
      light: "#78c8d4",
      dark: "#006064",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff77a9",
      dark: "#9a0036",
      contrastText: "#000",
    },
    error:{
      main:"#FF0000"
    }
  },
});

export default theme;
