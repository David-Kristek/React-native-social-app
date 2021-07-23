import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import Header from "../Posts/Header";
import User from "../../../components/User";
import Icon from "react-native-vector-icons/AntDesign";
import { useEffect } from "react";
import { TextStyle } from "react-native";
import { PostsContext } from "../../../context/PostsContext";

interface MenuItem {
  text: string;
  onClick: () => void;
  fontWeight?: boolean;
}
const windowWidth = Dimensions.get("window").width;

export default function UserPage() {
  const { user } = useContext(AuthContext);
  const { joinNewGroup } = useContext(PostsContext);
  const leftTranslate = new Animated.Value(windowWidth);
  const isOpended = useRef(false);
  const openMenu = () => {
    Animated.timing(leftTranslate, {
      toValue: windowWidth * 0.4,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      isOpended.current = true;
    });
  };
  const closeMenu = () => {
    Animated.timing(leftTranslate, {
      toValue: windowWidth,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      isOpended.current = false;
    });
  };
  const toggleMenu = () => {
    if (isOpended.current) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const MenuItem = ({ text, onClick, fontWeight }: MenuItem) => {
    return (
      <TouchableHighlight onPress={onClick}>
        <Text
          style={[
            style.menuItem,
            { fontWeight: fontWeight ? "bold" : "normal" },
          ]}
        >
          {text}
        </Text>
      </TouchableHighlight>
    );
  };
  if (!user) return <> </>;
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={style.box}>
          <User title={user.username} size={6} />
          <TouchableOpacity onPress={toggleMenu}>
            <Icon
              name={isOpended.current ? "menuunfold" : "menufold"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
      </Header>
      <Animated.View
        style={[style.menuBox, { transform: [{ translateX: leftTranslate }] }]}
      >
        <MenuItem text="Nastavení" onClick={() => {}} />
        <MenuItem text="Odhlásit se" onClick={() => {}} />
        <MenuItem text="Přidat novou skupinu" onClick={() => {joinNewGroup()}} />
        <MenuItem text="Skupiny:" onClick={() => {}} fontWeight />
        <TouchableHighlight>
          <Text style={style.groups}>For fun</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={style.groups}>Rodinka</Text>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: 3,
    alignItems: "center",
  },
  menuBox: {
    paddingTop: 110,
    backgroundColor: "#0c2d48",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: -100,
    left: 0,
  },
  menuItem: {
    color: "white",
    fontSize: 21,
    paddingVertical: 5,
    paddingLeft: "8%",
    zIndex: 100,
  },
  groups: {
    paddingTop: 5,
    fontSize: 17,
    color: "white",
    paddingLeft: "10%",
  },
});
