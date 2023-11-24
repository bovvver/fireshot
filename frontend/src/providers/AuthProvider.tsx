import { useState, createContext, ReactNode } from "react";
import { AuthContextInterface } from "@customTypes/providers";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginRequestData, RegistrationRequestData } from "@customTypes/api";
import {
  executeLogin,
  executeLogout,
  executeRefresh,
  executeRegistration,
} from "@api/AuthService";
import { ROOT_PATH, LOGIN_PATH } from "@config/routes";
import { useToast } from "@hooks/contextHooks";
import { AxiosError } from "axios";
import Cookies from "universal-cookie";
import { userCookie } from "@env/environments";

export const AuthContext = createContext<AuthContextInterface>({
  isLoginFormSelected: true,
  isAuthenticated: false,
  loggedUser: "",
  handleUserChange: () => {},
  handleFormSelection: () => {},
  handleAuthentication: () => {},
  handleLogin: () => {},
  handleRegistration: () => {},
  handleRefresh: () => {},
  forceLogout: () => {},
  authenticate: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginFormSelected, setIsLoginFormSelected] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const { handleToastOpening } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFormSelection = (isLoginForm: boolean) => {
    setIsLoginFormSelected(isLoginForm);
  };

  const handleAuthentication = (isAuthenticatedParam: boolean) => {
    setIsAuthenticated(isAuthenticatedParam);
  };

  const handleLogin = async (data: LoginRequestData) => {
    const response = await executeLogin(data);

    if (response && response.data.body) {
      const { message } = response.data;

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

  const handleRefresh = async () => {
    try {
      const response = await executeRefresh();
      if (response && response.data) {
        authenticate();
      }
    } catch (e) {
      forceLogout();
    }
  };

  const forceLogout = async () => {
    try {
      const response = await executeLogout();
      setIsAuthenticated(false);
      navigate(ROOT_PATH);
      handleToastOpening(response.data.message, "info");
    } catch (e) {
      handleToastOpening("Couldn't logout. Please try again.", "warning");
    }
  };

  const authenticate = () => {
    const cookies = new Cookies();
    setIsAuthenticated(true);
    handleUserChange(cookies.get(userCookie));

    if (location.pathname === LOGIN_PATH) {
      navigate(ROOT_PATH);
    } else {
      navigate(location.pathname);
    }
  };

  const handleUserChange = (newUser: string) => {
    setLoggedUser(newUser);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoginFormSelected,
        handleFormSelection,
        loggedUser,
        handleUserChange,
        isAuthenticated,
        handleAuthentication,
        handleLogin,
        handleRegistration,
        handleRefresh,
        forceLogout,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
