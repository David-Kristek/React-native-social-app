import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  size: number;
  title: string | undefined;
}

export default function User({ size, title }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Icon name="user" size={size * 4} color="navy" />
      <Text style={{ paddingLeft: 5, fontSize: size * 3.4 }}>
        {title}
      </Text>
    </View>
  );
}
