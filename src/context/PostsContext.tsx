import React, { useState, useEffect } from "react";
// import { AsyncStorage } from "react-native";
import PostLogic from "./logic/PostLogic";
interface PostsContextInterface {
  postloading: boolean;
  posts: Post[] | undefined;
  newFetch: () => void;
}

export const PostsContext = React.createContext<PostsContextInterface>({
  postloading: true,
  posts: undefined,
  newFetch: () => {},
});

interface AuthProviderProps {}
type Cmt = {
  text: string | undefined;
  commentedByUser: otherUser;
}
export const PostsProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { fetchPosts, formatLocationLabel } = PostLogic();
  const [postloading, setpostLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>();
  const [fetching, setFetching] = useState(true);
  const [comments, setComments] = useState<Cmt[]>();

  useEffect(() => {
    fetchPosts("GET", "").then((res) => {
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
      console.log("posts fetched");
      setpostLoading(false);
    });
  }, [fetching]);
  const newFetch = () => {
    setFetching((actFetching) => !actFetching);
  };
  return (
    <PostsContext.Provider
      value={{
        postloading: postloading,
        posts: posts,
        newFetch: newFetch,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
