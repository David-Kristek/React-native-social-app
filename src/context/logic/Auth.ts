import axios from "axios";
import { getExpoToken } from "./Notification";

interface Register {
  e: any;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const fetchData = async (method: Method, url: string, body?: any) => {
  try {
    const response = await axios({
      method,
      url: "http://social-site-server.herokuapp.com/api/auth/" + url,
      headers: {
        // token: localStorage.getItem("token"),
        // "auth-type": localStorage.getItem("auth-type"),
      },
      data: body,
    });
    return response;
  } catch (err) {
    return { err };
  }
};

export const handleRegiser = async ({
  name,
  email,
  password_confirmation,
  password,
}: Register) => {
  const res = await fetchData("POST", "register", {
    name,
    password,
    email,
    password_confirmation,
  });
  if ("data" in res) {
    if (res.data == "success") return res.data;
    else if (res.data.error) {
      return res.data.error;
    }
  }
  console.log(res);
  return "Oops, něco se pokazilo";
  // now login
};
export const handleLogin = async (email: string, password: string) => {
  const expotoken = await getExpoToken(); 
  const res = await fetchData("POST", "login", { email, password, expotoken });
  if ("data" in res) {
    console.log(res.data);
    if ("error" in res.data) {
      // predelat chyby tu i na servru
      return {
        email: res.data.error.includes("email") ? res.data.error : "",
        password:
          res.data.error.includes("password") &&
          !res.data.error.includes("Email")
            ? res.data.error
            : "",
        all:
          res.data.error.includes("Email") &&
          res.data.error.includes("password")
            ? res.data.error
            : "",
      };
    } else if ("user" in res.data) {
      return { user: res.data.user, token: res.data.token };
    }
  }
  return { email: "", password: "", all: "Oops, něco se pokazilo" };
};
export const checkAuth = async (token: string) => {
  if (token) {
    try {
      const response = await axios({
        method: "GET",
        url: "http://social-site-server.herokuapp.com/api/auth/is_logged",
        headers: {
          token: token,
          "auth-type": "jwt",
        },
      });
      if (response.data.msg === "success") return response.data.user;
      else return false;
    } catch (err) {
      return { err };
    }
  }
};
