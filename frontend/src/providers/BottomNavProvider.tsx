import { SyntheticEvent, createContext, useState, ReactNode } from "react";
import {
  BottomNavContextInterface,
  BottomNavValue,
} from "@customTypes/providers";
import { useLocation } from "react-router-dom";

export const BottomNavContext = createContext<BottomNavContextInterface>({
  isModalOpen: false,
  handleModalOpening: () => {},
  bottomNavValue: "",
  handleBottomNavValueChange: () => {},
  handleBottomNavValueClick: () => {},
  handleModalClose: () => {},
  modalTitle: "",
});

const BottomNavProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState<BottomNavValue>(
    location.pathname.slice(1) as BottomNavValue
  );
  const [modalTitle, setModalTitle] = useState("");

  const handleModalOpening = (isModalOpenParam: boolean, title: string = "") => {
    setIsModalOpen(isModalOpenParam);
    setModalTitle(title);
  };

  const handleBottomNavValueChange = (
    _e: SyntheticEvent,
    newBottomNavValue: BottomNavValue
  ) => {
    setBottomNavValue(newBottomNavValue);
    window.scrollTo(0, 0);
  };

  const handleBottomNavValueClick = (newBottomNavValue: BottomNavValue) => {
    setBottomNavValue(newBottomNavValue);
    window.scrollTo(0, 0);
  };

  const handleModalClose = () => {
    setBottomNavValue(location.pathname.slice(1) as BottomNavValue);
    handleModalOpening(false);
  };

  return (
    <BottomNavContext.Provider
      value={{
        isModalOpen,
        handleModalOpening,
        bottomNavValue,
        handleBottomNavValueChange,
        handleBottomNavValueClick,
        handleModalClose,
        modalTitle
      }}
    >
      {children}
    </BottomNavContext.Provider>
  );
};

export default BottomNavProvider;
