import PostPhoto from "@components/molecules/PostPhoto/PostPhoto";
import { PostWrapper } from "./PhotoSection.styles";
import PostUserData from "@components/molecules/PostUserData/PostUserData";
import UnderPhotoSection from "@components/molecules/UnderPhotoSection/UnderPhotoSection";

const PhotoSection = () => {
  return (
    <PostWrapper sx={{ maxWidth: { sm: "580px", lg: "580px" } }}>
      <PostUserData username="sampleUser" src="" location="New York" />
      <PostPhoto
        src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg"
        alt="sample"
      />
      <UnderPhotoSection />
    </PostWrapper>
  );
};

export default PhotoSection;
