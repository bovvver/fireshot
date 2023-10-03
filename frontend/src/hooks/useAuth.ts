import { useContext } from "react";
import { AuthContext } from "@providers/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
