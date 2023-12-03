import { AppBar, Link, Box, Container, IconButton } from "@mui/material";
import Logo from "@components/atoms/Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useModals, useAuth } from "@hooks/contextHooks";
import { StyledToolbar } from "./NavBar.styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { ROOT_PATH } from "@config/routes";

const NavBar = () => {
  const navigate = useNavigate();
  const {
    handleBottomNavValueClick,
    // handleNotificationOpen
  } = useModals();
  const { forceLogout } = useAuth();

  const navigateToHome = () => {
    navigate(ROOT_PATH);
    handleBottomNavValueClick("");
  };

  // const openNotifications = () => {
  //   handleNotificationOpen(true);
  // };

  return (
    <AppBar sx={{ zIndex: 400 }} elevation={1} position="sticky">
      <Container>
        <StyledToolbar>
          <Link underline="none" component="button" onClick={navigateToHome}>
            <Logo />
          </Link>
          <Box>
            <IconButton onClick={forceLogout}>
              <PowerSettingsNewIcon sx={{ fontSize: "1em" }} />
            </IconButton>
            {/* <IconButton onClick={openNotifications}>
              <Badge badgeContent={2} color="primary">
                <WhatshotIcon sx={{ fontSize: "1em" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <TelegramIcon sx={{ fontSize: "1em" }} />
            </IconButton> */}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
