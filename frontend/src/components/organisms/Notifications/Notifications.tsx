import { createPortal } from "react-dom";
import { Box, IconButton } from "@mui/material";
import BackButton from "@components/atoms/BackButton/BackButton";
// import NoNotifications from "@components/molecules/NoNotifications/NoNotifications";
import NotificationField from "@components/atoms/NotificationField/NotificationField";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModals } from "@hooks/contextHooks";
import { BoxWrapper, NotificationsHeader } from "./Notifications.styles";

const Notifications = () => {
  const { areNotificationsOpen, handleNotificationOpen } = useModals();

  return createPortal(
    <BoxWrapper open={areNotificationsOpen}>
      <NotificationsHeader>
        <BackButton
          value="Notifications"
          onClick={() => {
            handleNotificationOpen(false);
          }}
        />
        <IconButton sx={{ width: 40, height: 40 }}>
          <DeleteIcon />
        </IconButton>
      </NotificationsHeader>
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
    </BoxWrapper>,
    document.getElementById("notifications")!
  );
};

export default Notifications;
