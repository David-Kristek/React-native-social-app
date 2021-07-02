import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { PostsParamProps } from "../PostsParamList";
import Header from "../Header";
import Icon from "react-native-vector-icons/FontAwesome";
import Icona from "react-native-vector-icons/AntDesign";
import { Input } from "react-native-elements";

export default function AddPost({
  route,
  navigation,
}: PostsParamProps<"AddPost">) {
  const images = route.params.images;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(""); 
  const renderItem = ({ item }: any) => (
    <View style={{ paddingHorizontal: 2, paddingTop: 20, paddingBottom: 20 }}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={{
          height: 100,
          width: (100 * item.width) / item.height,
        }}
      />
    </View>
  );
  return (
    <>
      <Header>
        <View style={style.container}>
          <Icona
            onPress={() => {
              navigation.goBack();
            }}
            name="arrowleft"
            size={35}
            color="#000"
            style={{
              position: "absolute",
              left: 15,
            }}
          />
          <Text style={{ fontSize: 20 }}>Nahrajte příspěvek</Text>
          <Icon name="share-square" size={35} color="dodgerblue" />
        </View>
      </Header>
      <View>
        <FlatList
          horizontal={true}
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Input
        placeholder="Název"
        onChangeText={(value) => {
          setName(value);
        }}
      />
        <Input
        placeholder="Poloha"
        onChangeText={(value) => {
          setLocation(value);
        }}
      />
      <Input
        placeholder="Podrobnosti"
        onChangeText={(value) => {
          setDescription(value);
        }}
        multiline={true}
        numberOfLines={4}
      />
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: "20%",
    paddingRight: "5%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
