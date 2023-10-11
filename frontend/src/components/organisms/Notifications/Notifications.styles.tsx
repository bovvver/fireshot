import styled from "@emotion/styled";
import { Box } from "@mui/material";
import colors from "@styles/colorTheme";

export const BoxWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  ${({ open }: { open: boolean }) => `right: ${open ? 0 : "-100%"};`}
  background-color: ${colors.bgGray};
  transition: right 0.3s;
  z-index: 500;
`;

export const NotificationsHeader = styled(Box)`
  padding: 16px 16px 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
