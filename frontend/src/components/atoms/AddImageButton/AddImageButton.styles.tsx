import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const Input = styled.input`
  display: none;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledAddIcon = styled(AddIcon)`
  font-size: 5rem;
  cursor: pointer;
`;
