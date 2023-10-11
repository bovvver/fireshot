import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackButtonInterface } from "@customTypes/componentProps";

const BackButton = ({ onClick, value }: BackButtonInterface) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={onClick}>
        <ArrowBackIcon sx={{ fontSize: "1.5rem" }} />
      </IconButton>
      <Typography sx={{ fontSize: "1.5rem" }}>{value}</Typography>
    </Box>
  );
};

export default BackButton;
