import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Box, Modal, IconButton, InputBase, Divider } from "@mui/material";
import { useModals, useToast } from "@hooks/contextHooks";
import SearchIcon from "@mui/icons-material/Search";
import SearchModalNoResults from "@components/atoms/SearchModalNoResults/SearchModalNoResults";
import ModalSearchResult from "@components/atoms/ModalSearchResult/ModalSearchResult";
import { PaperWrapper, ModalTitle, SearchBar } from "./SearchModal.styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  executeAllUsersSearch,
  executeUserFollowersSearch,
  executeUserFollowingSearch,
} from "@api/ProfileService";
import { PROFILE_PATH } from "@config/routes";

const SearchModal = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const {
    isModalOpen,
    handleModalClose,
    modalTitle,
    modalData,
    handleModalData,
  } = useModals();
  const { handleToastOpening } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const executeSearch = async () => {
    const pathname = location.pathname;
    const nickname = pathname.slice(pathname.lastIndexOf("/") + 1);

    if (modalTitle === "Following") {
      return await executeUserFollowingSearch(searchBarValue, nickname);
    } else if (modalTitle === "Followers") {
      return await executeUserFollowersSearch(searchBarValue, nickname);
    } else {
      return await executeAllUsersSearch(searchBarValue);
    }
  };

  const displaySearchResult = async () => {
    try {
      const result = (await executeSearch()).data.body;

      if (result) handleModalData(result);
      setSearchBarValue("");
    } catch (e) {
      handleToastOpening(
        "Couldn't search for users. Please try again.",
        "error",
        e
      );
    }
  };

  const handleSearchBarChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") displaySearchResult();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(e.target.value);
  };

  const navigateToSelectedProfile = (nickname: string) => {
    navigate(PROFILE_PATH + nickname);
    handleModalClose();
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <PaperWrapper>
        <ModalTitle modaltitle={modalTitle}>{modalTitle}</ModalTitle>
        <SearchBar elevation={3}>
          <InputBase
            onKeyDown={handleSearchBarChange}
            onChange={handleInputChange}
            value={searchBarValue}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            onClick={displaySearchResult}
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </SearchBar>
        <Divider variant="middle" />
        {modalData.length === 0 ? (
          <SearchModalNoResults />
        ) : (
          <Box sx={{ overflowY: "scroll" }}>
            {modalData.map((el) => (
              <ModalSearchResult
                onClick={() => navigateToSelectedProfile(el)}
                key={el}
                username={el}
                src={el}
              />
            ))}
          </Box>
        )}
      </PaperWrapper>
    </Modal>
  );
};

export default SearchModal;
