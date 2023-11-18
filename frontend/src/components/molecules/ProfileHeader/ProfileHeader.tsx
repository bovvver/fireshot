import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ProfileHeaderInterface } from "@customTypes/componentProps";
import { BoxWrapper, StyledAvatar } from "./ProfileHeader.styles";
import ProfileStats from "../ProfileStats/ProfileStats";
import ProfileHeaderForm from "../ProfileHeaderForm/ProfileHeaderForm";
import { baseUrl } from "@env/environments";

const ProfileHeader = ({
  profileData,
  loggedUserAccount,
}: ProfileHeaderInterface) => {
  const [editable, setEditable] = useState(false);

  const handleEditChange = () => {
    setEditable((prev) => !prev);
  };

  const { email, nickname, description, followers, following, photos } =
    profileData!;

  const userFirstLetter = nickname[0].toUpperCase();
  const avatarUrl = `${baseUrl}/avatar/${email}`;

  return (
    <>
      {!editable ? (
        <Box>
          <BoxWrapper>
            <StyledAvatar src={avatarUrl}>{userFirstLetter}</StyledAvatar>
            <ProfileStats
              posts={photos.length}
              followers={followers}
              following={following}
            />
          </BoxWrapper>
          <Typography sx={{ fontWeight: "bold" }}>{nickname}</Typography>
          <Typography>{description}</Typography>
          {loggedUserAccount ? (
            <Button
              fullWidth
              variant="outlined"
              sx={{ my: 2 }}
              onClick={handleEditChange}
            >
              Edit profile
            </Button>
          ) : (
            <Button fullWidth variant="outlined" sx={{ my: 2 }}>
              Follow
            </Button>
          )}
        </Box>
      ) : (
        <ProfileHeaderForm handleEditChange={handleEditChange} />
      )}
    </>
  );
};

export default ProfileHeader;
