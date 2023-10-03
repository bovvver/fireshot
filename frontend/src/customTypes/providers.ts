export interface AuthContextInterface {
  isLoginFormSelected: boolean;
  handleFormSelection: (isLoginForm: boolean) => void;
  isAuthenticated: boolean;
  handleAuthentication: (isAuthenticatedParam: boolean) => void;
}
