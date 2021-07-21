import React from "react";
import { View, Text, StyleSheet } from "react-native";
import User from "../../../components/User";

interface Props {
  user: otherUser;
  text: string | undefined;
}

export default function Comment({ text, user }: Props) {
  return (
    <View style={style.box}>
      <User title={user.name} size={4.2} />
      <Text style={style.text}>{text}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    flexDirection: "row",
    marginVertical: 1,
    width: "100%",
  },
  text: {
    paddingLeft: 5,
    color: "dimgray",
    fontSize: 14,
  },
});
