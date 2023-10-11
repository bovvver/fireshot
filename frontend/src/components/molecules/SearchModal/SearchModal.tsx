import {
  Box,
  Modal,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Typography,
} from "@mui/material";
import { useModals } from "@hooks/contextHooks";
import colors from "@styles/colorTheme";
import SearchIcon from "@mui/icons-material/Search";
// import SearchModalNoResults from "@components/atoms/SearchModalNoResults/SearchModalNoResults";
import ModalSearchResult from "@components/atoms/ModalSearchResult/ModalSearchResult";

const SearchModal = () => {
  const { isModalOpen, handleModalClose, modalTitle } = useModals();

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <Paper
        sx={{
          height: 500,
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: `1px solid ${colors.green}`,
          boxShadow: 24,
        }}
      >
        <Typography
          sx={{
            my: modalTitle === "" ? 0 : 1,
            textAlign: "center",
            fontSize: "1.5rem",
            fontFamily: "'Fredoka',sans-serif",
          }}
        >
          {modalTitle}
        </Typography>
        <Paper
          elevation={3}
          sx={{
            m: 1,
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 350,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Divider variant="middle" />
        <Box sx={{ overflowY: "scroll" }}>
          <ModalSearchResult username="sampleUser" />
          <ModalSearchResult username="sampleUser" />
          <ModalSearchResult username="sampleUser" />
          <ModalSearchResult username="sampleUser" />
          <ModalSearchResult username="sampleUser" />
          <ModalSearchResult username="sampleUser" />
          <ModalSearchResult username="sampleUser" />
        </Box>

        {/* <SearchModalNoResults /> */}
      </Paper>
    </Modal>
  );
};

export default SearchModal;
