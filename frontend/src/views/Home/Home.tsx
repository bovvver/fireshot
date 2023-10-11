import HomePost from "@components/organisms/HomePost/HomePost";
import { HomeContainer } from "./Home.styles";

const Home = () => {
  return (
    <HomeContainer>
      <HomePost username="sampleUser" location="New York" />
      <HomePost username="userSample" />
      <HomePost username="testUser" location="London" />
    </HomeContainer>
  );
};

export default Home;
