import { AppBar, Link, Box, IconButton, Badge, Container } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TelegramIcon from "@mui/icons-material/Telegram";
import Logo from "@components/atoms/Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useModals } from "@hooks/contextHooks";
import { StyledToolbar } from "./NavBar.styles";

const NavBar = () => {
  const navigate = useNavigate();
  const { handleBottomNavValueClick, handleNotificationOpen } = useModals();

  const navigateToHome = () => {
    navigate("/");
    handleBottomNavValueClick("");
  };

  const openNotifications = () => {
    handleNotificationOpen(true);
  };

  return (
    <AppBar sx={{ zIndex: 400 }} elevation={1} position="sticky">
      <Container>
        <StyledToolbar>
          <Link underline="none" component="button" onClick={navigateToHome}>
            <Logo />
          </Link>
          <Box>
            <IconButton onClick={openNotifications}>
              <Badge badgeContent={2} color="primary">
                <WhatshotIcon sx={{ fontSize: "1em" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <TelegramIcon sx={{ fontSize: "1em" }} />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
