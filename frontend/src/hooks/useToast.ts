import { useContext } from "react";
import { ToastContext } from "@providers/ToastProvider";

const useToast = () => useContext(ToastContext);

export default useToast;
