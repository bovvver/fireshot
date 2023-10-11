import { IconButton } from "@mui/material";
import { BackButtonInterface } from "@customTypes/componentProps";
import {
  StyledBox,
  StyledBackButton,
  BackButtonMessage,
} from "./BackButton.styles";

const BackButton = ({ onClick, value }: BackButtonInterface) => {
  return (
    <StyledBox>
      <IconButton onClick={onClick}>
        <StyledBackButton />
      </IconButton>
      <BackButtonMessage>{value}</BackButtonMessage>
    </StyledBox>
  );
};

export default BackButton;
