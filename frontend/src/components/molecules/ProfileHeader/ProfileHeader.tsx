import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  Paper,
} from "@mui/material";
import { ProfileHeaderInterface } from "@customTypes/componentProps";
import ProfileStat from "@components/atoms/ProfileStat/ProfileStat";
import ProfileStatLink from "@components/atoms/ProfileStatLink/ProfileStatLink";
import { useModals } from "@hooks/contextHooks";
import AddImageButton from "@components/atoms/AddImageButton/AddImageButton";
import colors from "@styles/colorTheme";

const ProfileHeader = ({ loggedUserAccount }: ProfileHeaderInterface) => {
  const [avatar, setAvatar] = useState("");
  const [editable, setEditable] = useState(false);
  const { handleModalOpening } = useModals();

  const handleEditStart = () => {
    setEditable(true);
  };

  return (
    <Box>
      <Box sx={{ my: 2, display: "flex" }}>
        {!editable ? (
          <Avatar sx={{ width: "7em", height: "7em" }}>S</Avatar>
        ) : (
          <Paper
            sx={{
              position: "relative",
              width: "8.5em",
              height: "8.5em",
              backgroundColor: colors.selectGray,
              backgroundImage: `url(${avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
            }}
          >
            <AddImageButton setImage={setAvatar} />
          </Paper>
        )}

        <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly" }}>
          <ProfileStat counter={12} title="Posts" />

          <ProfileStatLink
            counter={1265}
            title="Followers"
            onClick={() => {
              handleModalOpening(true, "Followers");
            }}
          />

          <ProfileStatLink
            counter={11}
            title="Following"
            onClick={() => {
              handleModalOpening(true, "Following");
            }}
          />
        </Box>
      </Box>
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
        <Button fullWidth variant="outlined" sx={{ my: 2 }}>
          Save
        </Button>
      ) : null}

      {!editable && loggedUserAccount ? (
        <Button
          fullWidth
          variant="outlined"
          sx={{ my: 2 }}
          onClick={handleEditStart}
        >
          Edit profile
        </Button>
      ) : null}
    </Box>
  );
};

export default ProfileHeader;
