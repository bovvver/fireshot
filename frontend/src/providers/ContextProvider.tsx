import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProvider;
