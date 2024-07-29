import { Box, Button, styled, TextField } from "@mui/material";

export const FormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(8),
  gap: theme.spacing(2),
}));
