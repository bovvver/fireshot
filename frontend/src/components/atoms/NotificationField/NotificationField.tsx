import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  BoxWrapper,
  UserDataWrapper,
  StyledAvatar,
  UserAction,
  DeleteButton,
} from "./NotificationField.styles";

const NotificationField = () => {
  return (
    <>
      <BoxWrapper>
        <UserDataWrapper>
          <StyledAvatar>S</StyledAvatar>
          <UserAction>sampleUser liked your post.</UserAction>
        </UserDataWrapper>
        <DeleteButton>
          <CloseIcon />
        </DeleteButton>
      </BoxWrapper>
      <Divider variant="middle" />
    </>
  );
};

export default NotificationField;
