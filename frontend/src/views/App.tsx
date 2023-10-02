import NavBar from "../components/organisms/NavBar/NavBar";
import AppTheme from "../styles/AppTheme";
import { CssBaseline } from "@mui/material";
import BottomNavBar from "../components/organisms/BottomNavBar/BottomNavBar";
import Home from "./Home";

const App = () => {
  return (
    <AppTheme>
      <CssBaseline />
      <NavBar />
      <Home />
      <BottomNavBar />
    </AppTheme>
  );
};

export default App;
