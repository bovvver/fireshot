import { SyntheticEvent, createContext, useState, ReactNode } from "react";
import { ModalsContextInterface, BottomNavValue } from "@customTypes/providers";
import { useLocation } from "react-router-dom";

export const ModalsContext = createContext<ModalsContextInterface>({
  isModalOpen: false,
  modalTitle: "",
  modalData: [],
  bottomNavValue: "",
  areNotificationsOpen: false,
  isDrawerOpen: false,
  isDeleteModalOpen: false,
  handleModalOpening: () => {},
  handleBottomNavValueChange: () => {},
  handleBottomNavValueClick: () => {},
  handleModalClose: () => {},
  handleNotificationOpen: () => {},
  handleDrawerOpen: () => {},
  handleDeleteModalOpening: () => {},
  handleModalData: () => {},
});

const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState<string[]>([]);
  const [areNotificationsOpen, setAreNotificationsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState<BottomNavValue>(
    location.pathname.slice(1) as BottomNavValue
  );

  // SEARCH MODAL

  const handleModalData = (data: string[]) => {
    setModalData(data);
  }

  const handleModalOpening = (
    isModalOpenParam: boolean,
    title: string = ""
  ) => {
    setModalTitle(title);
    setIsModalOpen(isModalOpenParam);
  };

  const handleModalClose = () => {
    handleModalData([]);
    setBottomNavValue(location.pathname.slice(1) as BottomNavValue);
    handleModalOpening(false);
  };

  // BOTTOM NAV

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

  // NOTIFICATIONS MENU

  const handleNotificationOpen = (newNotificationsState: boolean) => {
    setAreNotificationsOpen(newNotificationsState);

    document.body.style.overflowY = newNotificationsState ? "hidden" : "scroll";
  };

  // COMMENT DRAWER

  const handleDrawerOpen = (newDrawerState: boolean) => {
    setIsDrawerOpen(newDrawerState);
  };

  // DELETE PHOTO MODAL
  const handleDeleteModalOpening = (newDeleteModalState: boolean) => {
    setIsDeleteModalOpen(newDeleteModalState);
  };

  return (
    <ModalsContext.Provider
      value={{
        isModalOpen,
        modalData,
        handleModalOpening,
        bottomNavValue,
        handleBottomNavValueChange,
        handleBottomNavValueClick,
        handleModalClose,
        modalTitle,
        areNotificationsOpen,
        handleNotificationOpen,
        isDrawerOpen,
        handleDrawerOpen,
        handleDeleteModalOpening,
        isDeleteModalOpen,
        handleModalData
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsProvider;
