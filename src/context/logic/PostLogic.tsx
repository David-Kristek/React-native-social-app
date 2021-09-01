import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostsContext } from "../PostsContext";

function PostLogic() {
  const { user } = useContext(AuthContext);

  const fetchPosts = async (
    groupPassword: string,
    method: Method,
    url: string,
    body?: any
  ) => {
    try {
      const response = await axios({
        method,
        url: "http://social-site-server.herokuapp.com/api/posts/" + url,
        data: body,
        headers: {
          token: user?.token,
          "auth-type": "jwt",
          groupPassword: groupPassword,
        },
      });
      return response.data;
    } catch (err) {
      return { err };
    }
  };

  const uploadPost = async (
    groupPassword: string,
    name: string,
    description: string,
    location: string,
    images: any[]
  ) => {
    if (!name) return;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("place", location);
    images.forEach((image) => {
      let match = /\.(\w+)$/.exec(image.filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append("images", {
        uri: image.uri,
        name: image.filename,
        type,
      });
    });

    try {
      const response = await axios({
        method: "POST",
        url: "http://social-site-server.herokuapp.com/api/posts/add",
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
          token: user?.token,
          "auth-type": "jwt",
          groupPassword: groupPassword,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  const formatLocationLabel = (label: string) => {
    if (label.length < 25) return label;
    let labelArr = label.split(",");
    return labelArr[0];
  };
  const createGroupFetch = async (name: string, password: string) => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://social-site-server.herokuapp.com/api/groups/add",
        headers: {
          token: user?.token,
          "auth-type": "jwt",
        },
        data: {
          name,
          groupPassword: password,
        },
      });
      return response.data;
    } catch (err) {
      return { err };
    }
  };
  const joinGroupFetch = async (password: string) => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://social-site-server.herokuapp.com/api/groups/checkPsw",
        headers: {
          token: user?.token,
          "auth-type": "jwt",
        },
        data: {
          groupPassword: password,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return { err };
    }
  };
  return {
    uploadPost,
    fetchPosts,
    formatLocationLabel,
    createGroupFetch,
    joinGroupFetch,
  };
}

export default PostLogic;
