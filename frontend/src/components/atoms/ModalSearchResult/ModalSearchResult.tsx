import { Avatar, Typography, Divider } from "@mui/material";
import { AvatarUserField } from "@customTypes/componentProps";
import { BoxWrapper } from "./ModalSearchResult.styles";

const ModalSearchResult = ({ username, src = "" }: AvatarUserField) => {
  return (
    <>
      <BoxWrapper>
        <Avatar src={src} sx={{ mx: 1 }}>
          {username[0].toUpperCase()}
        </Avatar>
        <Typography>{username}</Typography>
      </BoxWrapper>
      <Divider variant="middle" />
    </>
  );
};

export default ModalSearchResult;
