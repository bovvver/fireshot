import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import colors from "@styles/colorTheme";

const SearchModalNoResults = ({
  message = "Search for a profile",
}: {
  message?: string;
}) => {
  return (
    <Box
      sx={{
        height: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: colors.gray,
      }}
    >
      <SearchIcon sx={{ fontSize: "4.5em" }} />
      <Typography>{message}</Typography>
    </Box>
  );
};

export default SearchModalNoResults;
