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
    AuhtControl();
  }, []);
  const AuhtControl = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      setLoading(false);
      console.log("not logged");
      return;
    }
    setToken(token);
    const res = await Auth.checkAuth(token);
    if (res) {
      setUser({
        username: res.name,
        email: res.email,
        picture: res.picture,
      });
    }
    console.log("auth fetched");
    setLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
