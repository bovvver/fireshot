import { Avatar, Typography, Divider } from "@mui/material";
import { AvatarUserField } from "@customTypes/componentProps";
import { BoxWrapper } from "./ModalSearchResult.styles";
import { baseUrl } from "@env/environments";
import { photoPaths } from "@config/apiPaths";

const ModalSearchResult = ({
  onClick,
  username,
  src = "",
}: AvatarUserField) => {
  const { avatarPath } = photoPaths;

  return (
    <>
      <BoxWrapper onClick={onClick}>
        <Avatar src={`${baseUrl}${avatarPath}/${src}`} sx={{ mx: 1 }}>
          {username[0].toUpperCase()}
        </Avatar>
        <Typography>{username}</Typography>
      </BoxWrapper>
      <Divider variant="middle" />
    </>
  );
};

export default ModalSearchResult;
