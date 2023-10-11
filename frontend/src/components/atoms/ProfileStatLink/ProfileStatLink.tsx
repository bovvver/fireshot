import { Link, Typography } from "@mui/material";
import { ProfileStatLinkInterface } from "@customTypes/componentProps";

const ProfileStatLink = ({
  counter,
  title,
  onClick,
}: ProfileStatLinkInterface) => {
  return (
    <Link
      underline="none"
      component="button"
      onClick={onClick}
      sx={{
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{counter}</Typography>
      <Typography>{title}</Typography>
    </Link>
  );
};

export default ProfileStatLink;
