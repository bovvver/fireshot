import { Comment } from "@customTypes/componentProps";
import { baseUrl } from "@env/environments";
import { Box, Avatar, Container, Typography, Divider } from "@mui/material";
import { photoPaths } from "@config/apiPaths";

const CommentBlock = ({ author, content }: Comment) => {
  const { avatarPath } = photoPaths;

  return (
    <>
      <Container sx={{ py: 1, display: "flex", alignItems: "center" }}>
        <Avatar src={`${baseUrl}${avatarPath}/${author}`} sx={{ mr: 2 }}>
          {author[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>{author}</Typography>
          <Typography>{content}</Typography>
        </Box>
      </Container>
      <Divider variant="middle" />
    </>
  );
};

export default CommentBlock;
