import React, { createContext, useContext, FC, useState, useMemo } from "react";
// const ENDPOINT = "http://social-site-server.herokuapp.com";
const ENDPOINT = "http://10.0.0.7:5000";
import socketIOClient from "socket.io-client";
import { PostsContext } from "./PostsContext";

export type SocketContextState = {
  socket: any;
};
const contextDefaultValues: SocketContextState = {
  socket: {},
};

export const SocketContext =
  createContext<SocketContextState>(contextDefaultValues);

const SocketProvider: FC = ({ children }) => {
  const { groupPassword } = useContext(PostsContext);
  const socket = useMemo(() => {
    if (!groupPassword) return null;
    console.log(groupPassword, "rejoing");
    return socketIOClient(ENDPOINT, { query: { groupPassword } });
  }, [groupPassword]);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
