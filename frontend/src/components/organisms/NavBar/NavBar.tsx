import {
  AppBar,
  Link,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Container,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TelegramIcon from "@mui/icons-material/Telegram";
import Logo from "@components/atoms/Logo/Logo";
import { useNavigate } from "react-router-dom";
import useBottomNav from "@hooks/useBottomNav";

const NavBar = () => {
  const navigate = useNavigate();
  const { handleBottomNavValueClick } = useBottomNav();

  return (
    <AppBar elevation={1} position="sticky">
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            underline="none"
            component="button"
            onClick={() => {
              navigate("/");
              handleBottomNavValueClick("");
            }}
          >
            <Logo />
          </Link>
          <Box>
            <IconButton>
              <Badge badgeContent={2} color="primary">
                <WhatshotIcon sx={{ fontSize: "1em" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <TelegramIcon sx={{ fontSize: "1em" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
