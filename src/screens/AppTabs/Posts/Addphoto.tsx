import React from "react";
import { View, Text } from "react-native";
import { PostsParamProps } from "./PostsParamList";

export default function Addphoto({
  route,
  navigation,
}: PostsParamProps<"AddPhoto">) {
  const imagesPaths =  route.params.images; 

  return (
    <View>
      <Text></Text>
    </View>
  );
}
