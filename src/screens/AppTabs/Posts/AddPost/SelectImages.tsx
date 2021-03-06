import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../Header";
// @ts-ignore
import { ImageBrowser } from "expo-image-picker-multiple";
import Icon from "react-native-vector-icons/AntDesign";
import Icona from "react-native-vector-icons/FontAwesome";

import { PostsParamProps } from "../PostsParamList";

export default function SelectImages({
  navigation,
}: PostsParamProps<"SelectPhotos">) {
  const [photosCount, setPhotosCount] = useState(0);
  const [photoList, setphotoList] = useState<any[]>();

  const renderSelectedComponent = (number: number) => (
    <View style={style.countBadge}>
      <Text style={style.countBadgeText}>{number}</Text>
    </View>
  );
  // @ts-ignore
  const imagesCallback = (callback) => {
    // @ts-ignore
    callback // @ts-ignore
      .then((photos) => {
        setphotoList(photos);
      })
      .catch((e: Error) => console.log(e));
  };

  const updateHandler = (count: number, onUpdate: any) => {
    setPhotosCount(count);
    onUpdate();
  };

  const onSubmit = () => {
    if (photosCount < 1 || !photoList) return;
    navigation.navigate("AddPost", { images: photoList });
  };

  return (
    <>
      <Header>
        <View style={style.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
            style={{
              position: "absolute",
              left: 15,
            }}
          >
            <Icon name="arrowleft" size={35} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>Fotek vybráno: {photosCount}</Text>
          <TouchableOpacity
            onPress={onSubmit}
            style={{ position: "absolute", right: 15 }}
          >
            <Icona
              name="check"
              size={35}
              color="green"
              style={{
                opacity: photosCount > 0 ? 1 : 0,
              }}
            />
          </TouchableOpacity>
        </View>
      </Header>
      <ImageBrowser
        max={8}
        renderSelectedComponent={renderSelectedComponent}
        callback={imagesCallback}
        onChange={updateHandler}
      />
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
  },
});
