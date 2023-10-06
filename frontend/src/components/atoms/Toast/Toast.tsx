import { createPortal } from "react-dom";
import useToast from "@hooks/useToast";
import { Snackbar, Alert } from "@mui/material";

const Toast = () => {
  const { showToast, handleToastClosing, message, severity } = useToast();

  return createPortal(
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
    </Snackbar>,
    document.getElementById("toast")!
  );
};

export default Toast;
