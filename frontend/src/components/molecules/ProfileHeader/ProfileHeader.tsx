import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ProfileHeaderInterface } from "@customTypes/componentProps";
import { BoxWrapper, StyledAvatar } from "./ProfileHeader.styles";
import ProfileStats from "../ProfileStats/ProfileStats";
import ProfileHeaderForm from "../ProfileHeaderForm/ProfileHeaderForm";
import { baseUrl } from "@env/environments";
import { executeFollow, executeUnfollow } from "@api/ProfileService";
import { useToast } from "@hooks/contextHooks";
import { AxiosError } from "axios";

const ProfileHeader = ({
  profileData,
  loggedUserAccount,
}: ProfileHeaderInterface) => {
  const [isFollowing, setIsFollowing] = useState(profileData!.followed);
  const [followers, setFollowers] = useState(profileData!.followers);
  const [editable, setEditable] = useState(false);
  const { handleToastOpening } = useToast();

  const { email, nickname, description, following, photos } = profileData!;
  const userFirstLetter = nickname[0].toUpperCase();
  const avatarUrl = `${baseUrl}/avatar/${email}`;

  const handleEditChange = () => {
    setEditable((prev) => !prev);
  };

  const followProfile = async (
    profile: string,
    isFollowing: boolean = false
  ) => {
    try {
      if (isFollowing) {
        await executeFollow(profile);
        setIsFollowing(true);
        setFollowers((prevState) => prevState+1);
      } else {
        await executeUnfollow(profile);
        setIsFollowing(false);
        setFollowers((prevState) => prevState-1);
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response)
        handleToastOpening(e.response.data.message, "warning");
      else handleToastOpening("Follow failed. Please try again.", "warning");
    }
  };

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
            <>
              {isFollowing ? (
                <Button
                  onClick={() => followProfile(nickname)}
                  fullWidth
                  variant="contained"
                  sx={{ my: 2 }}
                >
                  Following
                </Button>
              ) : (
                <Button
                  onClick={() => followProfile(nickname, true)}
                  fullWidth
                  variant="outlined"
                  sx={{ my: 2 }}
                >
                  Follow
                </Button>
              )}
            </>
          )}
        </Box>
      ) : (
        <ProfileHeaderForm handleEditChange={handleEditChange} />
      )}
    </>
  );
};

export default ProfileHeader;
