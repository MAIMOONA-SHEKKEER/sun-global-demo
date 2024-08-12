import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CustomSnackbar from "../styles/components/CustomSnackbar";
import LoadingIndicator from "../styles/components/LoadingIndicator";
import { checkAuth } from "../utils/authUtils";

const PrivateRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const verifyAuth = async () => {
      const status = await checkAuth(setSnackbar, navigate);
      setAuthStatus(status);
    };
    verifyAuth();
  }, [navigate]);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (authStatus === null) {
    return <LoadingIndicator />;
  }

  if (!authStatus.auth) {
    return <Navigate to={authStatus.redirectTo} />;
  }

  return (
    <>
      {children}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default PrivateRoute;
