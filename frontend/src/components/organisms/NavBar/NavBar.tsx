import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TelegramIcon from "@mui/icons-material/Telegram";

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
        <Typography
          variant="h2"
          color="primary"
          sx={{
            display: "flex",
            alignItems: "center",
            fontFamily: `'Fredoka', sans-serif`,
            fontWeight: "bold",
            fontSize: "2em",
          }}
        >
          <WhatshotIcon sx={{ fontSize: "1em" }} />
          Fireshot
        </Typography>
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
