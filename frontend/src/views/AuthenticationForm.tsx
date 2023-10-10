import { useEffect } from "react";
import { Box, Container, Paper } from "@mui/material";
import Logo from "@components/atoms/Logo/Logo";
import colors from "@styles/colorTheme";
import Login from "@components/molecules/Login/Login";
import Registration from "@components/molecules/Registration/Registration";
import { useAuth } from "@hooks/contextHooks";
import { useNavigate } from "react-router-dom";

const AuthenticationForm = () => {
  const { isLoginFormSelected, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#102811",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23102811' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23163919' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%231d4a20' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23245c28' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%232b6f2f' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23338237' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
        /* background by SVGBackgrounds.com */
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
    </Box>
  );
};

export default AuthenticationForm;
