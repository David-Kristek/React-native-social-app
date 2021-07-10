import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icona from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

import User from "../../../components/User";
import DragGallery from "./DragGallery";
import PreStyle from "../../../styles/main";
import SinglePostLogic from "../../../context/logic/SinglePostLogic";
interface SinglePostInteface {
  item: { item: Post };
}

export default function SinglePost({ item }: SinglePostInteface) {
  const [commentInput, setCommentInput] = useState("");
  const [lastPress, setLastPress] = useState(0);
  var post = item.item;
  const { liked, likeCount, like, comments, addComment } = SinglePostLogic({
    postInfo: post,
  });
  const onDoublePress = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;
    setLastPress(time);
    const DOUBLE_PRESS_DELAY = 350;
    if (delta < DOUBLE_PRESS_DELAY) {
      like();
      setLastPress(0);
    }
  };
  return (
    <View style={style.container}>
      <View style={style.up}>
        <User size={5} title={post.createdByUser.name} />
        <View style={style.upRight}>
          {post.location && (
            <Icona name="map-marker" size={21} color="mediumseagreen" />
          )}
          <Text style={{ paddingRight: 10, paddingLeft: 4, fontSize: 15 }}>
            {post.location && post.location.label}
          </Text>
          <Text
            style={{
              fontSize: 14,
              paddingTop: 2,
              color: "dimgray",
            }}
          >
            {post.dateInString}
          </Text>
        </View>
      </View>
      <DragGallery images={post.images} onPress={onDoublePress} />
      <View style={style.bottom}>
        <View style={style.headingIcons}>
          <Text style={[PreStyle.h3, { paddingTop: 7 }]}>{post.name}</Text>
          <View style={style.icons}>
            <Text style={{ color: "dimgray", paddingTop: 5, fontSize: 18 }}>
              {likeCount}
            </Text>
            <Icon
              name={liked ? "heart" : "hearto"}
              size={32}
              color={liked ? "red" : "darkgray"}
              style={{ paddingRight: 5, paddingTop: 4 }}
              onPress={like}
            />
            <Text style={{ color: "dimgray", paddingTop: 5, fontSize: 18 }}>
              {comments && comments.length}
            </Text>
            <Icona name="comment-o" size={32} color="darkgrey" />
          </View>
        </View>
        <Text>{post.description}</Text>
        <View style={style.commentsPreBox}>
          <Text style={{ color: "dimgray", paddingTop: 4 }}>
            Zobrazit komentáře (2)
          </Text>
          <View style={{ width: 180 }}>
            <Input
              placeholder="Přidat komentář"
              style={{ fontSize: 14, width: 80 }}
              rightIcon={
                <Icona
                  name="send-o"
                  size={24}
                  color="grey"
                  onPress={() => addComment(commentInput)}
                />
              }
              blurOnSubmit
              onChangeText={(text) => {
                setCommentInput(text);
              }}
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
