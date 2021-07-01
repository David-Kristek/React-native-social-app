import axios from "axios";
import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
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
      url: "http://10.0.0.7:5000/api/auth/" + url,
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
  return "Oops, něco se pokazilo";
  // now login
};
export const handleLogin = async (email: string, password: string) => {
  const res = await fetchData("POST", "login", { email, password });
  if ("data" in res) {
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
      await AsyncStorage.setItem("token", res.data.token);
      return { user: res.data.user };
    }
  }
  return { email: "", password: "", all: "Oops, něco se pokazilo" };
};
export const checkAuth = async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    try {
      const response = await axios({
        method: "GET",
        url: "http://10.0.0.7:5000/api/auth/is_logged",
        headers: {
          token: token,
          "auth-type": "jwt",
        },
      });
      if (response.data.msg === "success") return response.data.user;
      else return false;
      return response;
    } catch (err) {
      return { err };
    }
  }
};
