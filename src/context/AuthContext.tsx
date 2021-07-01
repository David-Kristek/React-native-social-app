import React, { useState, useEffect } from "react";
// import { AsyncStorage } from "react-native";
import * as Auth from "./logic/Auth";

type LoginParams = {
  email: string;
  password: string;
};
interface AuthContextInterface {
  user: User;
  login: (email: string, password: string) => Promise<any>;
  register: (obj: any) => Promise<any>;
  logout: () => void;
  setUser: (obj: any) => void;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  setUser: () => {},
  loading: true,
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // loading screen
    Auth.checkAuth().then((res) => {
      console.log(res);
      if (res) {
        setUser({
          username: res.name,
          email: res.email,
          picture: res.picture,
        });
        setLoading(false);
      }
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        register: Auth.handleRegiser,
        login: Auth.handleLogin,
        logout: () => {
          setUser(null);
          //  clear token
        },
        setUser: setUser,
        loading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
