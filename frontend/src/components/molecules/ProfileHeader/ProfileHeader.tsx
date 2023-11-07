import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { ProfileHeaderInterface } from "@customTypes/componentProps";
import ProfileStat from "@components/atoms/ProfileStat/ProfileStat";
import ProfileStatLink from "@components/atoms/ProfileStatLink/ProfileStatLink";
import { useModals } from "@hooks/contextHooks";
import AddImageButton from "@components/atoms/AddImageButton/AddImageButton";
import {
  BoxWrapper,
  StyledAvatar,
  StyledPaper,
  ProfileStatsWrapper,
  ButtonWrapper,
  EditButton,
} from "./ProfileHeader.styles";

const ProfileHeader = ({ loggedUserAccount }: ProfileHeaderInterface) => {
  const [avatar, setAvatar] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [editable, setEditable] = useState(false);
  const { handleModalOpening } = useModals();

  const handleEditChange = () => {
    setEditable((prev) => !prev);
  };

  const openFollowersModal = () => {
    handleModalOpening(true, "Followers");
  };

  const openFollowingModal = () => {
    handleModalOpening(true, "Following");
  };

  return (
    <Box>
      <BoxWrapper>
        {!editable ? (
          <StyledAvatar>S</StyledAvatar>
        ) : (
          <StyledPaper avatar={avatar}>
            <AddImageButton
              setBackground={setAvatar}
              setImage={setSelectedPhoto}
            />
          </StyledPaper>
        )}

        <ProfileStatsWrapper>
          <ProfileStat counter={12} title="Posts" />

          <ProfileStatLink
            counter={1265}
            title="Followers"
            onClick={openFollowersModal}
          />

          <ProfileStatLink
            counter={11}
            title="Following"
            onClick={openFollowingModal}
          />
        </ProfileStatsWrapper>
      </BoxWrapper>
      <Typography sx={{ fontWeight: "bold" }}>sampleUser</Typography>

      {!editable ? (
        <Typography>
          Hello! I am sampleUser and this is my description. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit.
        </Typography>
      ) : (
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Description"
          placeholder="Tell your friends about yourself"
          multiline
          rows={3}
        />
      )}

      {!loggedUserAccount ? (
        <Button fullWidth variant="outlined" sx={{ my: 2 }}>
          Follow
        </Button>
      ) : null}

      {editable && loggedUserAccount ? (
        <ButtonWrapper>
          <EditButton variant="outlined" onClick={handleEditChange}>
            Cancel
          </EditButton>
          <EditButton variant="contained">Save</EditButton>
        </ButtonWrapper>
      ) : null}

      {!editable && loggedUserAccount ? (
        <Button
          fullWidth
          variant="outlined"
          sx={{ my: 2 }}
          onClick={handleEditChange}
        >
          Edit profile
        </Button>
      ) : null}
    </Box>
  );
};

export default ProfileHeader;
