import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Auth from "./logic/Auth";

type LoginParams = {
  email: string;
  password: string;
};
interface AuthContextInterface {
  user: User;
  token: string;
  login: (email: string, password: string) => Promise<any>;
  register: (obj: any) => Promise<any>;
  logout: () => void;
  setUser: (obj: any) => void;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  user: null,
  token: "",
  login: async () => {},
  logout: () => {},
  register: async () => {},
  setUser: () => {},
  loading: true,
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isActive = true;
    AsyncStorage.getItem("token").then((token) => {
      if (isActive) {
        if (!token) {
          setLoading(false);
          console.log("not logged");
          return;
        }
        setToken(token);
        Auth.checkAuth(token).then((res) => {
          if (isActive) {
            if (res) {
              setUser({
                username: res.name,
                email: res.email,
                picture: res.picture,
              });
            }
            console.log("auth fetched");
            setLoading(false);
          }
        });
      }
    });
    return () => {
      isActive = false;
    };
  }, []);
  const login = async (email: string, password: string) => {
    const res = await Auth.handleLogin(email, password);
    if ("token" in res) {
      setUser({
        username: res.user.name,
        email: res.user.email,
        picture: res.user.picture,
      });
      setToken(res.token);
      await AsyncStorage.setItem("token", res.token);
      return "success";
    } else return res;
  };
  const logout = () => {
    setUser(null);
    AsyncStorage.setItem("token", "");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
