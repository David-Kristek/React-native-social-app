import React, { useState } from "react";
// import { AsyncStorage } from "react-native";
import * as Auth from "./logic/Auth";
type User = null | { username: string };

export const AuthContext = React.createContext<{
  user: User;
  login: () => void;
  register: (obj : any) => Promise<any>;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  register: async () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        register: Auth.handleRegiser,
        login: () => Auth.handleLogin,
        logout: () => {
          setUser(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
