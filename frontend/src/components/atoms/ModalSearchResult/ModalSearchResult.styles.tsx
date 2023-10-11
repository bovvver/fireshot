import styled from "@emotion/styled";
import { Box } from "@mui/material";
import colors from "@styles/colorTheme";

export const BoxWrapper = styled(Box)`
  padding: 8px 0;
  margin: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.selectGray};
  }
`;
