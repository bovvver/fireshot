import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useModals } from "@hooks/contextHooks";

const BottomNavBar = () => {
  const { handleModalOpening, bottomNavValue, handleBottomNavValueChange } =
    useModals();
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 600 }}
      elevation={3}
    >
      <BottomNavigation
        value={bottomNavValue}
        onChange={handleBottomNavValueChange}
      >
        <BottomNavigationAction
          value=""
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          value="search"
          label="Search"
          icon={<SearchIcon />}
          onClick={() => {
            handleModalOpening(true);
          }}
        />
        <BottomNavigationAction
          value="add"
          label="Add"
          icon={<AddCircleOutlineIcon />}
          onClick={() => navigate("/add")}
        />
        <BottomNavigationAction
          value="profile"
          label="Profile"
          icon={<AccountCircleIcon />}
          onClick={() => navigate("/profile")}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
