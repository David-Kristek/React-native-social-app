import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function AppLoading() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size={80} color="dodgerblue" />
    </View>
  );
}
