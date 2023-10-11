import { Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import colors from "@styles/colorTheme";

const NoNotifications = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: "translate(0,-7%)",
      }}
    >
      <NotificationsIcon sx={{ fontSize: "5rem", color: colors.gray }} />
      <Typography sx={{ fontSize: "1rem" }}>Nothing new..</Typography>
    </Box>
  );
};

export default NoNotifications;
