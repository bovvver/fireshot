import CommentBlock from "@components/molecules/CommentBlock/CommentBlock";
import { useModals } from "@hooks/contextHooks";
import { Box, Drawer } from "@mui/material";

const CommentDrawer = ({ open }: { open: boolean }) => {
  const { handleDrawerOpen, drawerData } = useModals();

  const openDrawer = () => {
    handleDrawerOpen(false);
  };

  return (
    <Drawer open={open} anchor="bottom" onClose={openDrawer}>
      <Box sx={{ pt: 1 }}>
        {drawerData.map((el, i) => (
          <CommentBlock key={i} author={el.author} content={el.content}/>
        ))}
      </Box>
    </Drawer>
  );
};

export default CommentDrawer;
