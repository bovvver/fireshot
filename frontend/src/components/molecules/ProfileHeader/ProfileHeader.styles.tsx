import styled from "@emotion/styled";
import { Box, Avatar, Paper } from "@mui/material";
import colors from "@styles/colorTheme";

export const BoxWrapper = styled(Box)`
  margin: 16px 0;
  display: flex;
`;

export const StyledAvatar = styled(Avatar)`
  width: 7em;
  height: 7em;
`;

export const StyledPaper = styled(Paper)`
  position: relative;
  width: 8.5em;
  height: 8.5em;
  background-color: ${colors.selectGray};
  ${({ avatar }: { avatar: string }) => `background-image: url(${avatar});`}
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export const ProfileStatsWrapper = styled(Box)`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
`;
