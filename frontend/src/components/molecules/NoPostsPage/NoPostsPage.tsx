import { Typography } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import colors from "@styles/colorTheme";
import { BoxWrapper } from "./NoPostsPage.styles";

const NoPostsPage = () => {
  return (
    <BoxWrapper>
      <Diversity3Icon sx={{ fontSize: "1000%", color: colors.green }} />
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        You aren't following anyone.
      </Typography>
      <Typography>Connect with your friends!</Typography>
    </BoxWrapper>
  );
};

export default NoPostsPage;
