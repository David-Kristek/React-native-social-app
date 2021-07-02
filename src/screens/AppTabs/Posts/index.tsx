import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SelectImages from "./AddPost/SelectImages";
import HomeScreen from "./Home";
import Addphoto from "./AddPost/AddPost";
import AddPost from "./AddPost/AddPost";
const Stack = createStackNavigator();

export default function index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SelectPhotos" component={SelectImages} />
      <Stack.Screen name="AddPost" component={AddPost} />
    </Stack.Navigator>
  );
}
