import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import SearchModalProvider from "./ModalsProvider";
import ToastProvider from "./ToastProvider";
import ImageChangeProvider from "./ImageChangeProvider";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <SearchModalProvider>
          <ImageChangeProvider>{children}</ImageChangeProvider>
        </SearchModalProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default ContextProvider;
