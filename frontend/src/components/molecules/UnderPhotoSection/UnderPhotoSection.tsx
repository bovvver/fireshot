import {
  Box,
  IconButton,
  Link,
  FormControl,
  InputAdornment,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import SendIcon from "@mui/icons-material/Send";
import LikeStats from "@components/atoms/LikeStats/LikeStats";
import PhotoComment from "@components/atoms/PhotoComment/PhotoComment";
import PhotoDate from "@components/atoms/PhotoDate/PhotoDate";
import { useModals } from "@hooks/contextHooks";
import { StyledInput } from "./UnderPhotoSection.styles";

const date = new Date("2023-09-01T14:22:00"); // SAMPLE DATE FOR FRONT-END DEVELOPMENT ONLY. DELETE LATER.

const UnderPhotoSection = () => {
  const { handleDrawerOpen } = useModals();

  const openDrawer = () => {
    handleDrawerOpen(true);
  };

  return (
    <>
      <Box>
        <IconButton>
          <WhatshotIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <TelegramIcon />
        </IconButton>
      </Box>
      <Box sx={{ px: 1 }}>
        <LikeStats likes={1345} />
        <PhotoComment
          nickname="sampleUser"
          description="Hey! It's my newest photo!"
        />
        <Link
          component="button"
          onClick={openDrawer}
          sx={{
            marginBottom: 1,
            textDecoration: "none",
          }}
        >
          See all comments
        </Link>
        <PhotoComment nickname="sampleFriend" description="Fantastic!" />
        <PhotoDate date={date} />
      </Box>
      <FormControl fullWidth>
        <StyledInput
          placeholder="Add comment..."
          multiline
          sx={{ "& textarea": { px: 1 } }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Add comment">
                <SendIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

export default UnderPhotoSection;
