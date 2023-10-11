import styled from "@emotion/styled";
import { Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import colors from "@styles/colorTheme";

export const BoxWrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(0, -7%);
`;

export const StyledNotificationsIcon = styled(NotificationsIcon)`
  font-size: 5rem;
  color: ${colors.gray};
`;
