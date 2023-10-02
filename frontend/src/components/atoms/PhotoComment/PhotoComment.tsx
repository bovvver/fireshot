import { Typography } from "@mui/material";

const PhotoComment = ({
  nickname,
  description,
}: {
  nickname: string;
  description: string;
}) => {
  return (
    <Typography>
      <Typography component="span" sx={{ fontWeight: "bold" }}>
        {nickname}
      </Typography>{" "}
      {description}
    </Typography>
  );
};

export default PhotoComment;
