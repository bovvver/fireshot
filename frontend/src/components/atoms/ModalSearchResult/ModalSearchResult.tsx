import { Box, Avatar, Typography, Divider } from "@mui/material";
import colors from "@styles/colorTheme";
import { AvatarUserField } from "@customTypes/componentProps";

const ModalSearchResult = ({ username, src = "" }: AvatarUserField) => {
  return (
    <>
      <Box
        sx={{
          py: 1,
          mx: 2,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          ":hover": { backgroundColor: colors.selectGray },
        }}
      >
        <Avatar src={src} sx={{ mx: 1 }}>
          {username[0].toUpperCase()}
        </Avatar>
        <Typography>{username}</Typography>
      </Box>
      <Divider variant="middle" />
    </>
  );
};

export default ModalSearchResult;
