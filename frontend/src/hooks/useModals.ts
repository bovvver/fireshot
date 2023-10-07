import { useContext } from "react";
import { ModalsContext } from "@providers/ModalsProvider";

const useModals = () => useContext(ModalsContext);

export default useModals;
