import { AppBar, Toolbar, Box, IconButton, Badge } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TelegramIcon from "@mui/icons-material/Telegram";
import Logo from "@components/atoms/Logo/Logo";

const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo />
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
    </AppBar>
  );
};

export default NavBar;
