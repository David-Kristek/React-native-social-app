import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { PostsProvider } from "./PostsContext";
import Routes from "../Routes";
import SocketProvider from "./SocketContext";
interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <AuthProvider>
      <PostsProvider>
        <SocketProvider>
            <Routes />
        </SocketProvider>
      </PostsProvider>
    </AuthProvider>
  );
};
