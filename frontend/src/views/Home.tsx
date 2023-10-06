import { Container } from "@mui/material";
import HomePost from "@components/organisms/HomePost/HomePost";

const Home = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <HomePost username="sampleUser" location="New York" />
      <HomePost username="userSample" />
      <HomePost username="testUser" location="London" />
    </Container>
  );
};

export default Home;
