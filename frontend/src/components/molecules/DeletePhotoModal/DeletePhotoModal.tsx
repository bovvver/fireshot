import { Modal, Typography, Box, Button } from "@mui/material";
import { useModals } from "@hooks/contextHooks";
import { StyledPaper } from "./DeletePhotoModal.styles";

const DeletePhotoModal = () => {
  const { isDeleteModalOpen, handleDeleteModalOpening } = useModals();

  const closeDeleteModal = () => {
    handleDeleteModalOpening(false);
  };

  return (
    <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
      <StyledPaper elevation={1}>
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete this photo?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={closeDeleteModal} color="secondary">
            cancel
          </Button>
          <Button sx={{ ml: 1 }} variant="outlined" color="error">
            delete
          </Button>
        </Box>
      </StyledPaper>
    </Modal>
  );
};

export default DeletePhotoModal;
