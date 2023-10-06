import { useContext } from "react";
import { BottomNavContext } from "@providers/BottomNavProvider";

const useBottomNav = () => useContext(BottomNavContext);

export default useBottomNav;
