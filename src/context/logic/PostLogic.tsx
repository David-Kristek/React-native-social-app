import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

function PostLogic() {
  const { token } = useContext(AuthContext);
  const fetchPosts = async (method: Method, url: string, body?: any) => {
    try {
      const response = await axios({
        method,
        url: "http://social-site-server.herokuapp.com/api/posts/" + url,
        data: body,
        headers: {
          token: token,
          "auth-type": "jwt",
        },
      });
      return response.data;
    } catch (err) {
      return { err };
    }
  };

  const uploadPost = async (
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
          token: token,
          "auth-type": "jwt",
        },
      });
      console.log(response.data);
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
  return { uploadPost, fetchPosts, formatLocationLabel };
}

export default PostLogic;
