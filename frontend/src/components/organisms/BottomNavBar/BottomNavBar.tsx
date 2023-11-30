import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAuth, useModals } from "@hooks/contextHooks";
import { NavBarWrapper } from "./BottomNavBar.styles";
import { ADD_PATH, ROOT_PATH, PROFILE_PATH } from "@config/routes";

const BottomNavBar = () => {
  const { handleModalOpening, bottomNavValue, handleBottomNavValueChange } =
    useModals();
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  const modalProps = {
    isModalOpenParam: true,
  };

  const openModal = () => {
    handleModalOpening(modalProps);
  };

  return (
    <NavBarWrapper elevation={3}>
      <BottomNavigation
        value={bottomNavValue}
        onChange={handleBottomNavValueChange}
      >
        <BottomNavigationAction
          value=""
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate(ROOT_PATH)}
        />
        <BottomNavigationAction
          value="search"
          label="Search"
          icon={<SearchIcon />}
          onClick={openModal}
        />
        <BottomNavigationAction
          value="add"
          label="Add"
          icon={<AddCircleOutlineIcon />}
          onClick={() => navigate(ADD_PATH)}
        />
        <BottomNavigationAction
          value="profile"
          label="Profile"
          icon={<AccountCircleIcon />}
          onClick={() => navigate(PROFILE_PATH + loggedUser)}
        />
      </BottomNavigation>
    </NavBarWrapper>
  );
};

export default BottomNavBar;
