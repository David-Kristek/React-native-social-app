import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../../../context/GlobalContext";

interface UploadPostInterface {
  name: string;
  description: string;
  location: string;
  images: any[];
}

const fetchPosts = async (method: Method, url: string, body?: any) => {
  try {
    const response = await axios({
      method,
      url: "http://10.0.0.7:5000/api/posts/" + url,
      data: body,
    });
    return response.data;
  } catch (err) {
    return { err };
  }
};
function PostLogic() {
  const [posts, setPosts] = useState<Post[]>();
  const { setLoading } = useContext(GlobalContext);
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (!first) return;
    setFirst(false);
    fetchPosts("GET", "").then((res) => {
      setPosts(res);
      setLoading(false);
    });
  }, []);
  const uploadPost = ({
    name,
    description,
    location,
    images,
  }: UploadPostInterface) => {
    
  };
  return { posts };
}

export default PostLogic;
