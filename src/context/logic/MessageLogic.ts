import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { PostsContext } from "../PostsContext";
import { SocketContext } from "../SocketContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MessageLogic() {
  const { token, user } = useContext(AuthContext);
  const { groupPassword } = useContext(PostsContext);
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [messages, setMessages] = useState<message[]>([
    {
      text: "",
      sentByUser: null,
      createdAt: new Date(),
    },
  ]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    let isActive = true;
    AsyncStorage.getItem("messages").then((res) => {
      if (isActive && res) setMessages(JSON.parse(res));
    });
    conSocket();

    getMessages().then((res) => {
      if (isActive) {
        console.log("messages fetched");
        const msgs = res.length < 2 ? res : res.reverse();
        setMessages(msgs);
        setLoading(false);
        AsyncStorage.setItem("messages", JSON.stringify(msgs));
      }
    });
    axios
      .get(
        "http://social-site-server.herokuapp.com/api/groups/getName?groupPassword=" +
          groupPassword
      )
      .then((res) => {
        if (isActive)
          if ("groupname" in res.data) setGroupName(res.data.groupname);
      });
    return () => {
      isActive = false;
    };
  }, []);
  const getMessages = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://social-site-server.herokuapp.com/api/chat",
        headers: {
          token: token,
          "auth-type": "jwt",
          groupPassword,
        },
      });
      return response.data.resp;
    } catch (err) {
      console.log(err);
      return { err };
    }
  };
  const conSocket = () => {
    socket.on("new_message", (text: string, writerm: User) => {
      setMessages((curMsg) =>
        curMsg
          ? [{ text, sentByUser: writerm, createdAt: new Date() }, ...curMsg]
          : [{ text, sentByUser: user, createdAt: new Date() }]
      );
    });
  };
  const addMessage = (text: string) => {
    if (!user || !text) return;
    socket.emit("add_message", groupPassword, text, user);
    setMessages((curMsgs) =>
      curMsgs
        ? [{ text, sentByUser: user, createdAt: new Date() }, ...curMsgs]
        : [{ text, sentByUser: user, createdAt: new Date() }]
    );
  };
  return { messages, addMessage, loading, groupName };
}
