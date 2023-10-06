import { useState, createContext, ReactNode } from "react";
import { AuthContextInterface } from "@customTypes/providers";

export const AuthContext = createContext<AuthContextInterface>({
  isLoginFormSelected: true,
  handleFormSelection: () => {},
  isAuthenticated: false,
  handleAuthentication: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginFormSelected, setIsLoginFormSelected] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleFormSelection = (isLoginForm: boolean) => {
    setIsLoginFormSelected(isLoginForm);
  };

  const handleAuthentication = (isAuthenticatedParam: boolean) => {
    setIsAuthenticated(isAuthenticatedParam);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginFormSelected,
        handleFormSelection,
        isAuthenticated,
        handleAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
