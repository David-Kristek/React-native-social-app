import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  text: string;
  type: "my-message" | "others-message";
  username: string;
}

export default function Message({ text, type, username }: Props) {
  return (
    <View
      style={[
        style.container,
        { alignItems: type === "my-message" ? "flex-start" : "flex-end" },
      ]}
    >
        <Text style={style.name}>{username.split(" ")[0]}</Text>
      <View
        style={[
          style.box,
          {
            backgroundColor: type === "my-message" ? "#f5faff" : "#034694",
          },
        ]}
      >
        <Text
          style={[
            style.text,
            { color: type === "my-message" ? "#034694" : "#f5faff" },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  text: {
    fontSize: 17,
  },
  container: {
    width: "100%",
    paddingHorizontal: "5%",
    paddingBottom: 15,
  },
  box: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    maxWidth: "75%",
  },
  name: {
    fontSize: 14,
    color: "grey",
    paddingHorizontal: 5,
  },
});
