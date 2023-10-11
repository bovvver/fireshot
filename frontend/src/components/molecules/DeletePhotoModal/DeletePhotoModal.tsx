import { Modal, Typography, Paper, Box, Button } from "@mui/material";
import colors from "@styles/colorTheme";
import { useModals } from "@hooks/contextHooks";

const DeletePhotoModal = () => {
  const { isDeleteModalOpen, handleDeleteModalOpening } = useModals();

  return (
    <Modal
      open={isDeleteModalOpen}
      onClose={() => {
        handleDeleteModalOpening(false);
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          border: `2px solid ${colors.gray}`,
          borderRadius: "10px",
        }}
      >
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete this photo?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() => {
              handleDeleteModalOpening(false);
            }}
            color="secondary"
          >
            cancel
          </Button>
          <Button sx={{ ml: 1 }} variant="outlined" color="error">
            delete
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default DeletePhotoModal;
