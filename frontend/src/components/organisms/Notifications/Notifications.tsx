import { createPortal } from "react-dom";
import { Box, IconButton } from "@mui/material";
import colors from "@styles/colorTheme";
import BackButton from "@components/atoms/BackButton/BackButton";
// import NoNotifications from "@components/molecules/NoNotifications/NoNotifications";
import NotificationField from "@components/atoms/NotificationField/NotificationField";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModals } from "@hooks/contextHooks";

const Notifications = () => {
  const { areNotificationsOpen, handleNotificationOpen } = useModals();

  return createPortal(
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "fixed",
        top: 0,
        bottom: 0,
        right: areNotificationsOpen ? 0 : "-100%",
        bgcolor: colors.bgGray,
        transition: "right 0.3s",
        zIndex: 500,
      }}
    >
      <Box
        sx={{
          p: 2,
          pl: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BackButton
          value="Notifications"
          onClick={() => {
            handleNotificationOpen(false);
          }}
        />
        <IconButton sx={{ width: 40, height: 40 }}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{ mb: "60px", overflowY: "scroll" }}>
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
        <NotificationField />
      </Box>

      {/* <NoNotifications /> */}
    </Box>,
    document.getElementById("notifications")!
  );
};

export default Notifications;
