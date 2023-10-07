import { SyntheticEvent, createContext, useState, ReactNode } from "react";
import { ModalsContextInterface, BottomNavValue } from "@customTypes/providers";
import { useLocation } from "react-router-dom";

export const ModalsContext = createContext<ModalsContextInterface>({
  isModalOpen: false,
  handleModalOpening: () => {},
  bottomNavValue: "",
  handleBottomNavValueChange: () => {},
  handleBottomNavValueClick: () => {},
  handleModalClose: () => {},
  modalTitle: "",
  areNotificationsOpen: false,
  handleNotificationOpen: () => {},
});

const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areNotificationsOpen, setAreNotificationsOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState<BottomNavValue>(
    location.pathname.slice(1) as BottomNavValue
  );
  const [modalTitle, setModalTitle] = useState("");

  const handleModalOpening = (
    isModalOpenParam: boolean,
    title: string = ""
  ) => {
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

  const handleNotificationOpen = (newNotificationsState: boolean) => {
    setAreNotificationsOpen(newNotificationsState);

    document.body.style.overflowY = newNotificationsState ? "hidden" : "scroll";
  };

  const handleModalClose = () => {
    setBottomNavValue(location.pathname.slice(1) as BottomNavValue);
    handleModalOpening(false);
  };

  return (
    <ModalsContext.Provider
      value={{
        isModalOpen,
        handleModalOpening,
        bottomNavValue,
        handleBottomNavValueChange,
        handleBottomNavValueClick,
        handleModalClose,
        modalTitle,
        areNotificationsOpen,
        handleNotificationOpen,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsProvider;
