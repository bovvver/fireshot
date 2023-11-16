import { SyntheticEvent, ChangeEvent } from "react";
import { AlertColor } from "@mui/material";
import { LoginRequestData, RegistrationRequestData } from "./auth";

export interface AuthContextInterface {
  isLoginFormSelected: boolean;
  handleFormSelection: (isLoginForm: boolean) => void;
  isAuthenticated: boolean;
  loggedUser: string;
  handleAuthentication: (isAuthenticatedParam: boolean) => void;
  handleLogin: (data: LoginRequestData) => void;
  handleRegistration: (data: RegistrationRequestData) => void;
  handleRefresh: () => void;
  forceLogout: () => void;
  authenticate: () => void;
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
    setBackgroundFunction: (image: string) => void,
    setImageFunction: (image: File) => void
  ) => void;
}
