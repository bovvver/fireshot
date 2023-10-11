import styled from "@emotion/styled";
import { Paper, Box, Avatar } from "@mui/material";

export const PostWrapper = styled(Paper)`
  padding-top: 8px;
  margin: 24px 0;
  max-width: 600px;
`;

export const UserDataWrapper = styled(Box)`
  padding: 4px 0;
  margin: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 8px;
  width: 30px;
  height: 30px;
`;
