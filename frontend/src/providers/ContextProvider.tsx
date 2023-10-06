import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import SearchModalProvider from "./BottomNavProvider";
import ToastProvider from "./ToastProvider";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <SearchModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </SearchModalProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
