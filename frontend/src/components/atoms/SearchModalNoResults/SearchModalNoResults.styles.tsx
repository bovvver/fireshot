import styled from "@emotion/styled";
import { Box } from "@mui/material";
import colors from "@styles/colorTheme";

export const BoxWrapper = styled(Box)`
  height: 350px;
  display: "flex";
  flex-direction: "column";
  justify-content: "center";
  align-items: "center";
  color: ${colors.gray};
`;
