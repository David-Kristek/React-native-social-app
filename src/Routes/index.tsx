import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Text } from "react-native";
import Auth from "../screens/Auth";
import App from "../screens/AppTabs";
import LoadingScreen from "../components/AppLoading";
import { PostsContext } from "../context/PostsContext";
function Routes() {
  const { user, loading } = useContext(AuthContext);
  const { postloading } = useContext(PostsContext);

  return (
    <NavigationContainer>
      {loading || postloading ? <LoadingScreen /> : user ? <App /> : <Auth />}
    </NavigationContainer>
  );
}

export default Routes;
