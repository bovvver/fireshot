import { Box, Avatar, Typography, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NotificationField = () => {
  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: 55, height: 55 }}>S</Avatar>
          <Typography sx={{ px: 2, fontSize: "1.1rem" }}>
            sampleUser liked your post.
          </Typography>
        </Box>
        <IconButton sx={{ width: 40, height: 40 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider variant="middle" />
    </>
  );
};

export default NotificationField;
