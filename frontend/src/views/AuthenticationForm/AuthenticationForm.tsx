import { useEffect } from "react";
import Logo from "@components/atoms/Logo/Logo";
import Login from "@components/molecules/Login/Login";
import Registration from "@components/molecules/Registration/Registration";
import { useAuth } from "@hooks/contextHooks";
import { useNavigate } from "react-router-dom";
import {
  AuthenticationBackground,
  AuthenticationContainer,
  AuthenticationPaper,
} from "./AuthenticationForm.styles";

const AuthenticationForm = () => {
  const { isLoginFormSelected, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthenticationBackground>
      <AuthenticationContainer>
        <AuthenticationPaper elevation={3}>
          <Logo size={3} />
          {isLoginFormSelected ? <Login /> : <Registration />}
        </AuthenticationPaper>
      </AuthenticationContainer>
    </AuthenticationBackground>
  );
};

export default AuthenticationForm;
