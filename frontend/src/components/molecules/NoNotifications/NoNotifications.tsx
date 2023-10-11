import { Typography } from "@mui/material";
import { BoxWrapper, StyledNotificationsIcon } from "./NoNotifications.styles";

const NoNotifications = () => {
  return (
    <BoxWrapper>
      <StyledNotificationsIcon />
      <Typography sx={{ fontSize: "1rem" }}>Nothing new..</Typography>
    </BoxWrapper>
  );
};

export default NoNotifications;
