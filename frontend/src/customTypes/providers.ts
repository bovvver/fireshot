import { SyntheticEvent, ChangeEvent } from "react";
import { AlertColor } from "@mui/material";

export interface AuthContextInterface {
  isLoginFormSelected: boolean;
  handleFormSelection: (isLoginForm: boolean) => void;
  isAuthenticated: boolean;
  handleAuthentication: (isAuthenticatedParam: boolean) => void;
}

export type BottomNavValue = "" | "search" | "add" | "profile";

export interface ModalsContextInterface {
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
  areNotificationsOpen: boolean;
  handleNotificationOpen: (newNotificationsState: boolean) => void;
  isDrawerOpen: boolean;
  handleDrawerOpen: (newDrawerState: boolean) => void;
}

export interface ToastContextInterface {
  showToast: boolean;
  message: string;
  severity: AlertColor;
  handleToastOpening: (message: string, servity: AlertColor) => void;
  handleToastClosing: () => void;
}

export interface ImageChangeContextInterface {
  handleImageChange: (
    e: ChangeEvent<HTMLInputElement>,
    setImageFunction: (image: string) => void
  ) => void;
}
