import {
  LoginRequestData,
  AuthResponse,
  RegistrationRequestData,
} from "@customTypes/api";
import { apiClient } from "./ApiClient";
import { authPaths } from "@config/apiPaths";

const { loginPath, logoutPath, registrationPath, refreshPath } = authPaths;

export const executeLogin = async (data: LoginRequestData): AuthResponse => {
  return await apiClient.post(loginPath, data);
};

export const executeLogout = async (): AuthResponse => {
  return await apiClient.post(logoutPath, null);
};

export const executeRegistration = async (
  data: RegistrationRequestData
): AuthResponse => {
  return await apiClient.post(registrationPath, data);
};

export const executeRefresh = async (): AuthResponse => {
  return await apiClient.post(refreshPath, null);
};
