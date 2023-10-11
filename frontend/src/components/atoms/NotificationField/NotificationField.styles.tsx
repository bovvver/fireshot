import styled from "@emotion/styled";
import { Box, Avatar, Typography, IconButton } from "@mui/material";

export const BoxWrapper = styled(Box)`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserDataWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
  width: 55px;
  height: 55px;
`;

export const UserAction = styled(Typography)`
  padding: 0 16px;
  font-size: 1.1rem;
`;

export const DeleteButton = styled(IconButton)`
  width: 40px;
  height: 40px;
`;
