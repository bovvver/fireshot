import { Box, Avatar, Container, Typography, Divider } from "@mui/material";

const Comment = () => {
  return (
    <>
      <Container sx={{ py: 1, display: "flex", alignItems: "center" }}>
        <Avatar sx={{ mr: 2 }}>S</Avatar>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>sampleUser</Typography>
          <Typography>Fantastic photo!</Typography>
        </Box>
      </Container>
      <Divider variant="middle" />
    </>
  );
};

export default Comment;
