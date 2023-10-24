import { useToast, useAuth } from "@hooks/contextHooks";
import { Snackbar, Alert } from "@mui/material";

const Toast = () => {
  const { showToast, handleToastClosing, message, severity } = useToast();
  const { isAuthenticated } = useAuth();

  return (
    <Snackbar
      sx={{ mt: isAuthenticated ? "60px" : 0 }}
      open={showToast}
      onClose={handleToastClosing}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert severity={severity} onClose={handleToastClosing}>
        {" "}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
