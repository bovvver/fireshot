import { SyntheticEvent, ChangeEvent } from "react";
import { AlertColor } from "@mui/material";
import { LoginRequestData, RegistrationRequestData } from "./api";
import { Comment } from "./componentProps";

export interface AuthContextInterface {
  isLoginFormSelected: boolean;
  handleFormSelection: (isLoginForm: boolean) => void;
  isAuthenticated: boolean;
  loggedUser: string;
  handleUserChange: (newUser: string) => void;
  handleAuthentication: (isAuthenticatedParam: boolean) => void;
  handleLogin: (data: LoginRequestData) => void;
  handleRegistration: (data: RegistrationRequestData) => void;
  handleRefresh: () => void;
  forceLogout: () => void;
  authenticate: () => void;
}

export type BottomNavValue = "" | "search" | "add" | "profile";

export interface ModalOpeningFunctionInterface {
  isModalOpenParam: boolean;
  title?: string;
}

export interface ModalsContextInterface {
  isModalOpen: boolean;
  modalTitle: string;
  modalData: string[];
  bottomNavValue: BottomNavValue;
  areNotificationsOpen: boolean;
  isDrawerOpen: boolean;
  isDeleteModalOpen: boolean;
  drawerData: Comment[];
  handleModalOpening: (props: ModalOpeningFunctionInterface) => void;
  handleBottomNavValueChange: (
    _e: SyntheticEvent,
    newBottomNavValue: BottomNavValue
  ) => void;
  handleBottomNavValueClick: (newBottomNavValue: BottomNavValue) => void;
  handleModalClose: () => void;
  handleNotificationOpen: (newNotificationsState: boolean) => void;
  handleDrawerOpen: (newDrawerState: boolean, data?: Comment[]) => void;
  handleDeleteModalOpening: (newDeleteModalState: boolean) => void;
  handleModalData: (data: string[]) => void;
}

export interface ToastContextInterface {
  showToast: boolean;
  message: string;
  severity: AlertColor;
  handleToastOpening: (
    message: string,
    servity: AlertColor,
    e?: unknown
  ) => void;
  handleToastClosing: () => void;
}

export interface ImageChangeContextInterface {
  handleImageChange: (
    e: ChangeEvent<HTMLInputElement>,
    setBackgroundFunction: (image: string) => void,
    setImageFunction: (image: File) => void
  ) => void;
}
