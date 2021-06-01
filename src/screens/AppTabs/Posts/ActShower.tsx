import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  index: number;
  max: number;
}

export default function ActShower({ index, max }: Props) {
  return (
    <View style={style.container}>
      <Text style={{ color: "white" }}>
        {index + 1}/{max}
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    right: "2%",
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    borderRadius: 10,
    zIndex: 100,
    padding: 5,
  },
});
