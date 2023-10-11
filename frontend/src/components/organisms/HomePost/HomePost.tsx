import { Box, Typography } from "@mui/material";
import PostPhoto from "@components/molecules/PostPhoto/PostPhoto";
import UnderPhotoSection from "@components/molecules/UnderPhotoSection/UnderPhotoSection";
import { AvatarUserField } from "@customTypes/componentProps";
import MoreIcon from "@components/molecules/MoreIcon/MoreIcon";
import { PostWrapper, UserDataWrapper, StyledAvatar } from "./HomePost.styles";

const HomePost = ({ username, src = "", location = "" }: AvatarUserField) => {
  return (
    <PostWrapper elevation={1}>
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
      <PostPhoto
        src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg"
        alt="sample"
      />
      <UnderPhotoSection />
    </PostWrapper>
  );
};

export default HomePost;
