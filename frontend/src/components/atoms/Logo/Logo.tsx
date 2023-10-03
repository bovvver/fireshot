import { Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const Logo = ({ size = 2 }: { size?: number }) => {
  return (
    <Typography
      variant="h2"
      color="primary"
      sx={{
        display: "flex",
        alignItems: "center",
        fontFamily: `'Fredoka', sans-serif`,
        fontWeight: "bold",
        fontSize: `${size}em`,
      }}
    >
      <WhatshotIcon sx={{ fontSize: "1em" }} />
      Fireshot
    </Typography>
  );
};

export default Logo;
