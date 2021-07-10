import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { PostsProvider } from "./PostsContext";
import Routes from "../Routes";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <AuthProvider>
      <PostsProvider>
        <Routes />
      </PostsProvider>
    </AuthProvider>
  );
};
