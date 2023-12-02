import { useState, KeyboardEvent, ChangeEvent } from "react";
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
import { useModals, useToast } from "@hooks/contextHooks";
import { StyledInput } from "./UnderPhotoSection.styles";
import { executeAddingComment } from "@api/HomePageService";
import { CommentDTO } from "@customTypes/api";
import { UnderPhotoSectionProps } from "@customTypes/componentProps";

const UnderPhotoSection = ({ post }: UnderPhotoSectionProps) => {
  const [comment, setComment] = useState("");
  const { handleDrawerOpen } = useModals();
  const { handleToastOpening } = useToast();

  const { id, likes, owner, description, date, comments } = post;
  const { author: firstCommentAuthor, content: firstCommentContent } =
    comments[0];

  const openDrawer = () => {
    handleDrawerOpen(true);
  };

  const sendComment = async () => {
    const commentDTO: CommentDTO = {
      photoId: id,
      content: comment,
    };

    try {
      const res = await executeAddingComment(commentDTO);

      handleToastOpening(res.data.message, "success");
      setComment("");
    } catch (e) {
      handleToastOpening("Couldn't add comment. Please try again.", "error", e);
    }
  };

  const handleCommentBarChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendComment();
  };

  const handleCommentInput = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
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
        <LikeStats likes={likes} />
        <PhotoComment nickname={owner} description={description} />
        {comments.length !== 0 ? (
          <>
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
            <PhotoComment
              nickname={firstCommentAuthor}
              description={firstCommentContent}
            />
          </>
        ) : null}
        <PhotoDate date={new Date(Date.parse(date))} />
      </Box>
      <FormControl fullWidth>
        <StyledInput
          onKeyDown={handleCommentBarChange}
          onChange={handleCommentInput}
          value={comment}
          placeholder="Add comment..."
          multiline
          sx={{ "& textarea": { px: 1 } }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Add comment" onClick={sendComment}>
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
