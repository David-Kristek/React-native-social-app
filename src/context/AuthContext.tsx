import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    let isActive = true;
    AsyncStorage.getItem("user").then((userFromStorageString) => {
      if (isActive) {
        if (!userFromStorageString) {
          console.log("not logged");
          setLoading(false);
          return;
        }
        const userFromStorage: User = JSON.parse(userFromStorageString);
        if (!userFromStorage) return;
        console.log(userFromStorage, "userFromStorage");
        setUser({
          username: userFromStorage.username,
          email: userFromStorage.email,
          picture: userFromStorage.picture,
          token: userFromStorage.token,
        });
        setLoading(false);
        console.log("auth fetched");
      }
    });
    return () => {
      isActive = false;
    };
  }, []);
  const login = async (email: string, password: string) => {
    const res = await Auth.handleLogin(email, password);
    console.log(res, "logged");
    if ("token" in res) {
      setUser({
        username: res.user.name,
        email: res.user.email,
        picture: res.user.picture,
        token: res.token,
      });
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          username: res.user.name,
          email: res.user.email,
          picture: res.user.picture,
          token: res.token,
        })
      );
      return "success";
    } else return res;
  };
  const logout = () => {
    setUser(null);
    AsyncStorage.setItem("user", "");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        register: Auth.handleRegiser,
        login,
        logout,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
