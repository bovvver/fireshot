import { useContext } from "react";
import { ImageChangeContext } from "@providers/ImageChangeProvider";
import { AuthContext } from "@providers/AuthProvider";
import { ModalsContext } from "@providers/ModalsProvider";
import { ToastContext } from "@providers/ToastProvider";

export const useImage = () => useContext(ImageChangeContext);

export const useAuth = () => useContext(AuthContext);

export const useModals = () => useContext(ModalsContext);

export const useToast = () => useContext(ToastContext);
