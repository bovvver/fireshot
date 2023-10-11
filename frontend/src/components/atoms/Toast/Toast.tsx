import { useToast } from "@hooks/contextHooks";
import { Snackbar, Alert } from "@mui/material";

const Toast = () => {
  const { showToast, handleToastClosing, message, severity } = useToast();

  return (
    <Snackbar
      sx={{ mt: "60px" }}
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
