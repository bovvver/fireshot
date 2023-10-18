import PostPhoto from "@components/molecules/PostPhoto/PostPhoto";
import UnderPhotoSection from "@components/molecules/UnderPhotoSection/UnderPhotoSection";
import { AvatarUserField } from "@customTypes/componentProps";
import { PostWrapper } from "./HomePost.styles";
import PostUserData from "@components/molecules/PostUserData/PostUserData";

const HomePost = ({ username, src = "", location = "" }: AvatarUserField) => {
  return (
    <PostWrapper elevation={1}>
      <PostUserData username={username} src={src} location={location} />
      <PostPhoto
        src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg"
        alt="sample"
      />
      <UnderPhotoSection />
    </PostWrapper>
  );
};

export default HomePost;
