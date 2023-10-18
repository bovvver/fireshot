import { Box, Typography } from "@mui/material";
import { UserDataWrapper, StyledAvatar } from "./PostUserData.styles";
import { AvatarUserField } from "@customTypes/componentProps";
import MoreIcon from "@components/molecules/MoreIcon/MoreIcon";

const PostUserData = ({ username, src, location }: AvatarUserField) => {
  return (
    <UserDataWrapper>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <StyledAvatar src={src}>{username[0].toUpperCase()}</StyledAvatar>
        <Box>
          <Typography sx={{ lineHeight: "150%" }}>{username}</Typography>
          <Typography sx={{ fontSize: "0.8em", lineHeight: "90%" }}>
            {location}
          </Typography>
        </Box>
      </Box>
      <MoreIcon />
    </UserDataWrapper>
  );
};

export default PostUserData;
