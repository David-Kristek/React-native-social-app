import React, { useState, useEffect } from "react";
// import { AsyncStorage } from "react-native";
import PostLogic from "./logic/PostLogic";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PostsContextInterface {
  postloading: boolean;
  posts: Post[] | undefined;
  newFetch: () => void;
  groupPassword: string;
  createGroup: (name: string, password: string) => Promise<any>;
  joinGroup: (password: string) => Promise<any>;
  joinNewGroup: () => Promise<any>;
}

export const PostsContext = React.createContext<PostsContextInterface>({
  postloading: true,
  posts: undefined,
  newFetch: () => {},
  groupPassword: "",
  createGroup: async () => {},
  joinGroup: async () => {},
  joinNewGroup: async () => {},
});

interface AuthProviderProps {}
type Cmt = {
  text: string | undefined;
  commentedByUser: otherUser;
};
export const PostsProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { fetchPosts, formatLocationLabel, createGroupFetch, joinGroupFetch } =
    PostLogic();
  const [postloading, setpostLoading] = useState(true);
  const [groupPassword, setGroupPassword] = useState("");
  const [posts, setPosts] = useState<Post[]>();
  const [fetching, setFetching] = useState(true);
  const [comments, setComments] = useState<Cmt[]>();

  useEffect(() => {
    AsyncStorage.getItem("posts").then((res) => {
      if (res) {
        const convRes: Post[] = JSON.parse(res);
        setPosts(convRes);
        setpostLoading(false);
      }
    });
    AsyncStorage.getItem("groupPassword").then((res) => {
      console.log("group password", res);
      if (res) setGroupPassword(res);
      else {
        setpostLoading(false);
        return;
      }
      fetchPosts(res, "GET", "").then((res) => {
        const posts = res.map((post: Post) => {
          let dateObject = new Date(post.createdAt);
          let formatedLabel = post.location
            ? formatLocationLabel(post.location.label)
            : "";
          if (!post.location)
            return { ...post, dateInString: dateObject.toDateString() };
          return {
            ...post,
            dateInString: dateObject.toDateString(),
            // location: { ...location, label: formatedLabel },
          };
        });
        setPosts(posts);
        const stringPosts = JSON.stringify(posts);
        AsyncStorage.setItem("posts", stringPosts)
          .then(() => {
            if (postloading) setpostLoading(false);
            console.log("posts fetched");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }, [fetching]);
  const newFetch = () => {
    setFetching((actFetching) => !actFetching);
  };
  const createGroup = async (name: string, password: string) => {
    const res = await createGroupFetch(name, password);
    if (res.msg) {
      setGroupPassword(password);
      await AsyncStorage.setItem("groupPassword", password);
    }
    return res;
  };
  const joinGroup = async (password: string) => {
    const res = await joinGroupFetch(password);
    if (res.name) {
      console.log(password);
      setGroupPassword(password);
      await AsyncStorage.setItem("groupPassword", password);
      await AsyncStorage.setItem("posts", "");
    }
    return res;
  };
  // leaveGroup spíš
  const joinNewGroup = async () => {
    setGroupPassword("");
    await AsyncStorage.setItem("groupPassword", "");
  };
  return (
    <PostsContext.Provider
      value={{
        postloading,
        posts,
        newFetch,
        groupPassword,
        createGroup,
        joinGroup,
        joinNewGroup,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
