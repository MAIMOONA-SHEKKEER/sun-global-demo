import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
}));

export default StyledWrapper;