import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Logo } from "../../../components/Images";
import Header from "./Header";
import SinglePost from "./SinglePost";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    img: [
      require("../../../../assets/Mountain.png"),
      require("../../../../assets/bike.jpg"),
    ],
    text: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    img: [
      require("../../../../assets/flowers.jpg"),
      require("../../../../assets/Mountain.png"),
    ],
    text: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem"

  },

  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    img: [
      require("../../../../assets/tiger.jpg"),
      require("../../../../assets/flowers.jpg"),
    ],
    text: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem"

  },
  {
    id: "58694a0fa-da1-471f-bd96-145571e29d72",
    title: "Third Item",
    img: [
      require("../../../../assets/bike.jpg"),
      require("../../../../assets/tiger.jpg"),
      require("../../../../assets/flowers.jpg"),
    ],
  },
];
function Index() {
  const renderItem = ({ item }: any) => <SinglePost item={item} />;
  return (
    <View>
      <Header>
        <View style={style.container}>
          <Logo size={48} />
          <Icon name="plus-square" size={35} color="#31B8F0" />
        </View>
      </Header>
      <FlatList
        style={style.flatList}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "5%",
    paddingLeft: "2%",
  },
  flatList: {
    paddingVertical: -580,
    paddingTop: 20
  }
});
export default Index;
