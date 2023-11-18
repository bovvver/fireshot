import { ReactNode, createContext, useState } from "react";
import { ToastContextInterface } from "@customTypes/providers";
import { AlertColor } from "@mui/material";

export const ToastContext = createContext<ToastContextInterface>({
  showToast: false,
  message: "",
  severity: "info",
  handleToastOpening: () => {},
  handleToastClosing: () => {},
});

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const handleToastOpening = (message: string, servity: AlertColor) => {
    setMessage(message);
    setShowToast(true);
    setSeverity(servity);
  };

  const handleToastClosing = () => {
    setShowToast(false);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        message,
        severity,
        handleToastOpening,
        handleToastClosing,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
