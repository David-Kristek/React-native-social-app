import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icona from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

import User from "../../../components/User";
import DragGallery from "./DragGallery";
import PreStyle from "../../../styles/main";

interface Props {
  item: {
    title: string;
    text: string;
    img: any[];
  };
}

export default function SinglePost({ item }: Props) {
  return (
    <View style={style.container}>
      <View style={style.up}>
        <User size={5} />
        <View style={style.upRight}>
          <Icona name="map-marker" size={21} color="mediumseagreen" />
          <Text style={{ paddingRight: 10, paddingLeft: 4, fontSize: 15 }}>
            Praha hl.m.
          </Text>
          <Text style={{ fontSize: 14, paddingTop: 2, color: "dimgray" }}>
            10.5. 2021
          </Text>
        </View>
      </View>
      <DragGallery images={item.img} />
      <View style={style.bottom}>
        <View style={style.headingIcons}>
          <Text style={PreStyle.h3}>{item.title}</Text>
          <View style={style.icons}>
            <Text style={{ color: "dimgray", paddingTop: 5 }}>21</Text>
            <Icon
              name="hearto"
              size={25}
              color="darkgrey"
              style={{ paddingRight: 5, paddingTop: 4 }}
            />
            <Icona name="comment-o" size={25} color="darkgrey" />
          </View>
        </View>
        <Text>{item.text}</Text>
        <View style={style.commentsPreBox}>
          <Text style={{ color: "dimgray", paddingTop: 4 }}>
            Zobrazit komentáře (2)
          </Text>
          <View style={{ width: 180 }}>
            <Input
              placeholder="Přidat komentář"
              style={{ fontSize: 14, width: 80 }}
              rightIcon={<Icona name="send-o" size={24} color="grey" />}
            />
          </View>
        </View>
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
    paddingBottom: 1,
    alignItems: "center",
  },
  upRight: {
    flexDirection: "row",
  },
  bottom: {
    paddingHorizontal: 10,
  },
  headingIcons: {
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsPreBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
});
