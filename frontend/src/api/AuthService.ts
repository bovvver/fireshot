import {
  LoginRequestData,
  AuthRequestResponse,
  RegistrationRequestData,
} from "@customTypes/auth";
import { apiClient } from "./ApiClient";
import { authPaths } from "@config/apiPaths";

const { loginPath, logoutPath, registrationPath, refreshPath } = authPaths;

export const executeLogin = async (
  data: LoginRequestData
): AuthRequestResponse => {
  return await apiClient
    .post(loginPath, data, {
      withCredentials: true,
    })
};

export const executeLogout = async (): AuthRequestResponse => {
  return await apiClient
    .post(logoutPath, null, { withCredentials: true })
    .then((res) => res.data);
};

export const executeRegistration = async (
  data: RegistrationRequestData
): AuthRequestResponse => {
  return await apiClient.post(registrationPath, data);
};

export const executeRefresh = async (): AuthRequestResponse => {
  return await apiClient
    .post(refreshPath, null, { withCredentials: true });
};
