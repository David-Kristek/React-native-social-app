import React, { useState, useEffect } from "react";
// import { AsyncStorage } from "react-native";

interface GlobalContextInterface {
  loading: boolean;
  setLoading: (par: boolean) => void;
}

export const GlobalContext = React.createContext<GlobalContextInterface>({
  loading: true,
  setLoading: () => {},
});

interface AuthProviderProps {}

export const GlobalProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  return (
    <GlobalContext.Provider
      value={{
        loading: loading,
        setLoading: setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
