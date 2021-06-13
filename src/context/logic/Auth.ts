import { SetStateAction, Dispatch } from "react";
import axios from "axios";
interface Register {
  e: any;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const fetchData = async (method: Method, url: string, body?: any) => {
  try {
    const response = await axios({
      method,
      url: "http://10.0.0.7:5000/api/posts/" + url,
      headers: {
        token: localStorage.getItem("token"),
        "auth-type": localStorage.getItem("auth-type"),
      },
      data: body,
    });
    return response;
  } catch (err) {
    return { err };
  }
};

export const handleRegiser = ({
  username,
  email,
  password_confirmation,
  password,
}: Register) => {
  return fetchData("GET", "register", {
    username,
    password,
    email,
    password_confirmation,
  });
};

export const handleLogin = (email : string, password : string) => {
    return fetchData("GET", "login", {email, password})
}