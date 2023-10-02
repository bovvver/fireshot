import { StyledImage } from "./PostPhoto.styles";

const PostPhoto = ({ src, alt }: { src: string; alt: string }) => {
  return <StyledImage src={src} alt={alt} />;
};

export default PostPhoto;
