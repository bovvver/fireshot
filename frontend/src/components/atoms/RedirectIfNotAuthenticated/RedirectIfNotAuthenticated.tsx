import { ReactNode, useEffect } from "react";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "@config/routes";

const RedirectIfNotAuthenticated = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(LOGIN_PATH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default RedirectIfNotAuthenticated;