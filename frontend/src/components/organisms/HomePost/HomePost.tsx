import { Avatar, Box, Paper, Typography } from "@mui/material";
import PostPhoto from "@components/molecules/PostPhoto/PostPhoto";
import UnderPhotoSection from "@components/molecules/UnderPhotoSection/UnderPhotoSection";
import { AvatarUserField } from "@customTypes/componentProps";

const HomePost = ({ username, src = "", location = "" }: AvatarUserField) => {
  return (
    <Paper elevation={1} sx={{ paddingTop: 1, my: 3, maxWidth: "600px" }}>
      <Box
        sx={{
          py: 0.5,
          mb: 1,
          ml: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar src={src} sx={{ marginRight: 1, width: 30, height: 30 }}>{username[0].toUpperCase()}</Avatar>
        <Box>
          <Typography sx={{ lineHeight: "150%" }}>{username}</Typography>
          <Typography sx={{ fontSize: "0.8em", lineHeight: "90%" }}>
            {location}
          </Typography>
        </Box>
      </Box>
      <PostPhoto
        src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg"
        alt="sample"
      />
      <UnderPhotoSection />
    </Paper>
  );
};

export default HomePost;
