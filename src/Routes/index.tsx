import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Text } from "react-native";
import Auth from "../screens/Auth";
import App from "../screens/AppTabs";
function Routes() {
  const { user, login } = useContext(AuthContext);

  return <NavigationContainer>{user ? <App /> : <Auth />}</NavigationContainer>;
}

export default Routes;
