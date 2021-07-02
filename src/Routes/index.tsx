import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Text } from "react-native";
import Auth from "../screens/Auth";
import App from "../screens/AppTabs";
import LoadingScreen from "../components/AppLoading";
import { GlobalContext } from "../context/GlobalContext";
function Routes() {
  const { user } = useContext(AuthContext);
  const { loading } = useContext(GlobalContext);
  useEffect(() => {
    console.log(loading);
  }, [loading]); 
  return (
    <NavigationContainer>
      {loading ? <LoadingScreen /> : user ? <App /> : <Auth />}
    </NavigationContainer>
  );
}

export default Routes;
