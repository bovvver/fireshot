import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import colors from "@styles/colorTheme";

export const StyledPaper = styled(Paper)`
  padding: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid ${colors.gray};
  border-radius: 10px;
`;
