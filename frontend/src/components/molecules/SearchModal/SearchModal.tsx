import { Box, Modal, IconButton, InputBase, Divider } from "@mui/material";
import { useModals } from "@hooks/contextHooks";
import SearchIcon from "@mui/icons-material/Search";
import SearchModalNoResults from "@components/atoms/SearchModalNoResults/SearchModalNoResults";
import ModalSearchResult from "@components/atoms/ModalSearchResult/ModalSearchResult";
import { PaperWrapper, ModalTitle, SearchBar } from "./SearchModal.styles";

const SearchModal = () => {
  const { isModalOpen, handleModalClose, modalTitle, modalData } = useModals();

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <PaperWrapper>
        <ModalTitle modaltitle={modalTitle}>{modalTitle}</ModalTitle>
        <SearchBar elevation={3}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </SearchBar>
        <Divider variant="middle" />
        {modalData.length === 0 ? (
          <SearchModalNoResults />
        ) : (
          <Box sx={{ overflowY: "scroll" }}>
            {modalData.map((el) => (
              <ModalSearchResult username={el} />
            ))}
          </Box>
        )}
      </PaperWrapper>
    </Modal>
  );
};

export default SearchModal;
