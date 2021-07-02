import React from "react";
import { AuthProvider } from "../context/AuthContext";
import Routes from "../Routes";
import { GlobalProvider } from "./GlobalContext";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </GlobalProvider>
  );
};
