import { Avatar, Box, Paper, Typography } from "@mui/material";
import PostPhoto from "../../molecules/PostPhoto/PostPhoto";
import UnderPhotoSection from "../../molecules/UnderPhotoSection/UnderPhotoSection";

const HomePost = () => {
  return (
    <Paper elevation={4} sx={{ paddingTop: 1, my: 3}}>
      <Box
        sx={{
          marginBottom: 1,
          marginLeft: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ marginRight: 1, width: 30, height: 30 }}>S</Avatar>
        <Typography component="p">sampleUser</Typography>
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
