import { Box, Typography } from "@mui/material";

const ProfileStat = ({
  counter,
  title,
}: {
  counter: number;
  title: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{counter}</Typography>
      <Typography>{title}</Typography>
    </Box>
  );
};

export default ProfileStat;
