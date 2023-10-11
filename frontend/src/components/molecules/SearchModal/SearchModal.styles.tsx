import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import colors from "@styles/colorTheme";

export const PaperWrapper = styled(Paper)`
  height: 500;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${colors.green};
  box-shadow: 24;
`;

export const ModalTitle = styled(Typography)`
  text-align: center;
  font-size: 1.5rem;
  font-familly: "Fredoka", sans-serif;
  ${({ modalTitle }: { modalTitle: string }) =>
    `margin: ${modalTitle === "" ? 0 : "8px"};`}
`;

export const SearchBar = styled(Paper)`
  margin: 8px;
  padding: 2px 4px;
  width: 350px;
  display: flex;
  align-items: center;
`;
