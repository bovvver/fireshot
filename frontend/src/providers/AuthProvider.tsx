import { useState, createContext, ReactNode } from "react";
import { AuthContextInterface } from "@customTypes/providers";
import { useNavigate } from "react-router-dom";
import { LoginRequestData, RegistrationRequestData } from "@customTypes/auth";
import {
  executeLogin,
  executeLogout,
  executeRefresh,
  executeRegistration,
} from "@api/AuthService";
import { jwtToken } from "@env/environments";
import Cookies from "universal-cookie";
import { ROOT_PATH } from "@config/routes";
import { useToast } from "@hooks/contextHooks";
import { AxiosError } from "axios";

export const AuthContext = createContext<AuthContextInterface>({
  isLoginFormSelected: true,
  isAuthenticated: false,
  handleFormSelection: () => {},
  handleAuthentication: () => {},
  handleLogin: () => {},
  handleRegistration: () => {},
  handleLogout: () => {},
  forceLogout: () => {},
  authenticate: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginFormSelected, setIsLoginFormSelected] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { handleToastOpening } = useToast();
  const navigate = useNavigate();

  const handleFormSelection = (isLoginForm: boolean) => {
    setIsLoginFormSelected(isLoginForm);
  };

  const handleAuthentication = (isAuthenticatedParam: boolean) => {
    setIsAuthenticated(isAuthenticatedParam);
  };

  const handleLogin = async (data: LoginRequestData) => {
    const response = await executeLogin(data);

    if (response && response.data.body) {
      const { accessToken } = response.data.body;
      const { message } = response.data;

      localStorage.setItem(jwtToken, accessToken);
      handleToastOpening(message, "success");
      authenticate();
    }
  };

  const handleRegistration = async (data: RegistrationRequestData) => {
    try {
      const response = await executeRegistration(data);
      handleFormSelection(true);
      handleToastOpening(response.data.message, "success");
    } catch (e) {
      if (e instanceof AxiosError && e.response)
        handleToastOpening(e.response.data.message, "error");
      else handleToastOpening("Registration error.", "error");
    }
  };

  const handleLogout = async () => {
    const cookies = new Cookies();

    try {
      if (cookies.get("refresh-present")) {
        const response = await executeRefresh();
        if (response && response.data.body) {
          const { accessToken } = response.data.body;
          const { message } = response.data;

          localStorage.setItem(jwtToken, accessToken);
          handleToastOpening(message, "info");
        }
      }
    } catch (e) {
      forceLogout();
    }
  };

  const forceLogout = async () => {
    try {
      const response = await executeLogout();
      localStorage.removeItem(jwtToken);
      setIsAuthenticated(false);
      navigate(ROOT_PATH);
      handleToastOpening(response.data.message, "info");
    } catch (e) {
      handleToastOpening("Couldn't logout. Please try again.", "warning");
    }
  };

  const authenticate = () => {
    setIsAuthenticated(true);
    navigate(ROOT_PATH);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginFormSelected,
        handleFormSelection,
        isAuthenticated,
        handleAuthentication,
        handleLogin,
        handleRegistration,
        handleLogout,
        forceLogout,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
