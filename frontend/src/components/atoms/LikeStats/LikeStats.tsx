import { Typography } from "@mui/material";

const LikeStats = ({ likes }: { likes: number }) => {
  return (
    <Typography>
      <Typography component="span" sx={{ fontWeight: "bold" }}>
        {likes}
      </Typography>{" "}
      {likes == 1 ? "fire" : "fires"}
    </Typography>
  );
};

export default LikeStats;
