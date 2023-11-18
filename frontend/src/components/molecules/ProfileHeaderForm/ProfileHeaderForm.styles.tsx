import styled from "@emotion/styled";
import { Box, Paper, Button } from "@mui/material";
import colors from "@styles/colorTheme";

export const BoxWrapper = styled(Box)`
  margin: 16px 0;
  display: flex;
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

export const ButtonWrapper = styled(Box)`
  display: flex;
  gap: 0.5em;
`;

export const EditButton = styled(Button)`
  margin: 10px 0;
  flex: 1;
`;