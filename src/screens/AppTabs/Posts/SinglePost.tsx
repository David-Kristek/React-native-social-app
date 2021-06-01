import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { PostImage } from "../../../components/Images";
import Icon from "react-native-vector-icons/FontAwesome";
import User from "../../../components/User";
import DragGallery from "./DragGallery";

interface Props {
  item: {
    title: string;
    img: any[];
  }
}

export default function SinglePost({ item }: Props) {
  return (
    <View style={style.container}>
      <View style={style.up}>
        <User size={5} />
        <View style={style.upRight}>
          <Icon name="map-marker" size={20} color="green" />
          <Text style={{ paddingRight: 10, paddingLeft: 4 }}>Praha hl.m.</Text>
          <Text>10.5. 2021</Text>
        </View>
      </View>
      <DragGallery images={item.img} />
      <View>
        <Text>{item.title}</Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  up: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: "2%",
    paddingLeft: "2%",
    paddingBottom: 5,
  },
  upRight: {
    flexDirection: "row",
  },
});
