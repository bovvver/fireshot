import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ProfileHeaderInterface } from "@customTypes/componentProps";
import { BoxWrapper, StyledAvatar } from "./ProfileHeader.styles";
import ProfileStats from "../ProfileStats/ProfileStats";
import ProfileHeaderForm from "../ProfileHeaderForm/ProfileHeaderForm";

const ProfileHeader = ({ loggedUserAccount }: ProfileHeaderInterface) => {
  const [editable, setEditable] = useState(false);

  const handleEditChange = () => {
    setEditable((prev) => !prev);
  };

  return (
    <>
      {!editable ? (
        <Box>
          <BoxWrapper>
            <StyledAvatar>S</StyledAvatar>
            <ProfileStats />
          </BoxWrapper>
          <Typography sx={{ fontWeight: "bold" }}>sampleUser</Typography>
          <Typography>
            Hello! I am sampleUser and this is my description. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit.
          </Typography>
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
