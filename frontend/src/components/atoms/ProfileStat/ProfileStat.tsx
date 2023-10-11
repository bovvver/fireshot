import { Box, Typography } from "@mui/material";
import { ProfileStatInterface } from "@customTypes/componentProps";

const ProfileStat = ({ counter, title }: ProfileStatInterface) => {
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
