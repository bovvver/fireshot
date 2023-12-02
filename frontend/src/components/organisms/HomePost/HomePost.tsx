import PostPhoto from "@components/molecules/PostPhoto/PostPhoto";
import UnderPhotoSection from "@components/molecules/UnderPhotoSection/UnderPhotoSection";
import { HomePostProps } from "@customTypes/componentProps";
import { PostWrapper } from "./HomePost.styles";
import PostUserData from "@components/molecules/PostUserData/PostUserData";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "@config/routes";
import { baseUrl } from "@env/environments";
import { photoPaths } from "@config/apiPaths";

const HomePost = ({ post }: HomePostProps) => {
  const navigate = useNavigate();
  const { source, description, location, owner } = post;
  const { avatarPath } = photoPaths;

  const navigateToProfile = () => {
    navigate(PROFILE_PATH + owner);
  };

  return (
    <PostWrapper elevation={1}>
      <PostUserData
        onClick={navigateToProfile}
        username={owner}
        src={`${baseUrl}${avatarPath}/${owner}`}
        location={location}
      />
      <PostPhoto src={`${baseUrl}/photo/${source}`} alt={description} />
      <UnderPhotoSection post={post} />
    </PostWrapper>
  );
};

export default HomePost;
