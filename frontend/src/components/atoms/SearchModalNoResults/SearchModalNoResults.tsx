import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BoxWrapper } from "./SearchModalNoResults.styles";

const SearchModalNoResults = ({
  message = "Search for a profile",
}: {
  message?: string;
}) => {
  return (
    <BoxWrapper>
      <SearchIcon sx={{ fontSize: "4.5em" }} />
      <Typography>{message}</Typography>
    </BoxWrapper>
  );
};

export default SearchModalNoResults;
