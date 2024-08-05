import { Card, styled } from "@mui/material";

const StyledCardContent = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(10),
}));

export default StyledCardContent;
