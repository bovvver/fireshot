import { Typography } from "@mui/material";
import { ProfileStatLinkInterface } from "@customTypes/componentProps";
import { StyledLink, InvisibleButton } from "./ProfileStatLink.styles";

const ProfileStatLink = ({
  counter,
  title,
  onClick,
}: ProfileStatLinkInterface) => {
  return (
    <StyledLink onClick={onClick}>
      <InvisibleButton>
        <Typography>{counter}</Typography>
        <Typography>{title}</Typography>
      </InvisibleButton>
    </StyledLink>
  );
};

export default ProfileStatLink;
