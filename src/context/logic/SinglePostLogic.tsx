import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { PostsContext } from "../PostsContext";
import { SocketContext } from "../SocketContext";
import PostLogic from "./PostLogic";

interface Cmt {
  text: string | undefined;
  commentedByUser: otherUser;
}
interface Props {
  postInfo: Post;
}
export default function SinglePostLogic({ postInfo }: Props) {
  const [comments, setComments] = useState<Cmt[]>();
  const [likeCount, setlikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const { fetchPosts } = PostLogic();
  const { groupPassword } = useContext(PostsContext);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    console.log(user, "single post logic");
    conSocket();
    setlikeCount(postInfo.likedByUsers.length);
    var coms = postInfo.comments.reverse();
    setLiked(isLiked());
    setComments(coms);
  }, []);
  const conSocket = () => {
    socket.on("getComments", (comments: Cmt[]) => {
      setComments(comments);
    });
    socket.on("getLikeCount", (num: number) => {
      setlikeCount(num);
    });
  };
  const isLiked = () => {
    if (!user) return false;
    const { likedByUsers } = postInfo;
    if (likedByUsers.filter((userL) => userL.email == user.email).length > 0)
      return true;
    return false;
  };
  const like = () => {
    setLiked((isLiked) => !isLiked);
    fetchPosts(groupPassword, "GET", "like/" + postInfo._id).then((res) => {
      if (!res) return;
      if (res.msg) {
        console.log(res.msg);
        if (res.msg === "like") {
          setlikeCount((curLikeCount) => curLikeCount + 1);
        }
        if (res.msg === "unlike") {
          setlikeCount((curLikeCount) => curLikeCount - 1);
        }
      }
      socket.emit("likeCount", postInfo._id);
    });
  };
  const addComment = (text: string) => {
    if (!text || !user) return;
    fetchPosts(groupPassword, "POST", "comment/" + postInfo._id, {
      text: text,
    }).then((res) => {
      if (!res) return;
      if (res.msg === "commented") {
        socket.emit("actComment", postInfo._id);
        const newComment = {
          text: text,
          commentedByUser: {
            name: user.username,
            email: user.email,
            image: user.picture,
            createdAt: null,
          },
        };
        if (!comments) return;
        setComments([newComment, ...comments]);
      }
    });
  };
  return {
    liked,
    likeCount,
    like,
    comments,
    addComment,
  };
}
