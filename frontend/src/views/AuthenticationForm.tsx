import { useEffect } from "react";
import { Container, Paper } from "@mui/material";
import Logo from "@components/atoms/Logo/Logo";
import colors from "@styles/colorTheme";
import Login from "@components/molecules/Login/Login";
import Registration from "@components/molecules/Registration/Registration";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthenticationForm = () => {
  const { isLoginFormSelected, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 5, borderTop: `3px solid ${colors.green}` }}
      >
        <Logo size={3} />
        {isLoginFormSelected ? <Login /> : <Registration />}
      </Paper>
    </Container>
  );
};

export default AuthenticationForm;
