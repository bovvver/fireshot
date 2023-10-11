import { Typography } from "@mui/material";
import { ProfileStatInterface } from "@customTypes/componentProps";
import { BoxWrapper } from "./ProfileStat.styles";

const ProfileStat = ({ counter, title }: ProfileStatInterface) => {
  return (
    <BoxWrapper>
      <Typography>{counter}</Typography>
      <Typography>{title}</Typography>
    </BoxWrapper>
  );
};

export default ProfileStat;
