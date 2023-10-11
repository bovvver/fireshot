import Comment from "@components/molecules/Comment/Comment";
import { useModals } from "@hooks/contextHooks";
import { Box, Drawer } from "@mui/material";

const CommentDrawer = ({ open }: { open: boolean }) => {
  const { handleDrawerOpen } = useModals();

  const openDrawer = () => {
    handleDrawerOpen(false);
  };

  return (
    <Drawer open={open} anchor="bottom" onClose={openDrawer}>
      <Box sx={{ pt: 1 }}>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </Box>
    </Drawer>
  );
};

export default CommentDrawer;
