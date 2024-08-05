import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
//   minHeight: "85vh",
  backgroundColor: theme.palette.background.default,
}));

export default StyledWrapper;