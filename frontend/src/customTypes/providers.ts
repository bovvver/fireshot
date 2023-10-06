import { SyntheticEvent } from "react";
import { AlertColor } from "@mui/material";

export interface AuthContextInterface {
  isLoginFormSelected: boolean;
  handleFormSelection: (isLoginForm: boolean) => void;
  isAuthenticated: boolean;
  handleAuthentication: (isAuthenticatedParam: boolean) => void;
}

export type BottomNavValue = "" | "search" | "add" | "profile";

export interface BottomNavContextInterface {
  isModalOpen: boolean;
  handleModalOpening: (isModalOpenParam: boolean, title?: string) => void;
  bottomNavValue: BottomNavValue;
  handleBottomNavValueChange: (
    _e: SyntheticEvent,
    newBottomNavValue: BottomNavValue
  ) => void;
  handleBottomNavValueClick: (newBottomNavValue: BottomNavValue) => void;
  handleModalClose: () => void;
  modalTitle: string;
}

export interface ToastContextInterface {
  showToast: boolean;
  message: string;
  severity: AlertColor;
  handleToastOpening: (message: string, servity: AlertColor) => void;
  handleToastClosing: () => void;
}
