import { SyntheticEvent, useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const BottomNavBar = () => {
  const [navValue, setNavValue] = useState("home");
  const navigate = useNavigate();

  const handleChange = (_e: SyntheticEvent, newValue: string) => {
    setNavValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={navValue} onChange={handleChange}>
        <BottomNavigationAction
          value="home"
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          value="search"
          label="Search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          value="add"
          label="Add"
          icon={<AddCircleOutlineIcon />}
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
