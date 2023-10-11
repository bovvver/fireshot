import { Container } from "@mui/material";
import HomePost from "@components/organisms/HomePost/HomePost";

const PhotoSection = () => {
  return (
    <Container>
      <HomePost username="sampleUser" location="New York" />
    </Container>
  );
};

export default PhotoSection;
