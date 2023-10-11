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
  bottomNavValue: BottomNavValue;
  modalTitle: string;
  areNotificationsOpen: boolean;
  isDrawerOpen: boolean;
  isDeleteModalOpen: boolean;
  handleModalOpening: (isModalOpenParam: boolean, title?: string) => void;
  handleBottomNavValueChange: (
    _e: SyntheticEvent,
    newBottomNavValue: BottomNavValue
  ) => void;
  handleBottomNavValueClick: (newBottomNavValue: BottomNavValue) => void;
  handleModalClose: () => void;
  handleNotificationOpen: (newNotificationsState: boolean) => void;
  handleDrawerOpen: (newDrawerState: boolean) => void;
  handleDeleteModalOpening: (newDeleteModalState: boolean) => void;
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
