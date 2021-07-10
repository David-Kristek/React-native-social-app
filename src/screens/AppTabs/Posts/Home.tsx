import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Logo } from "../../../components/Images";
import Header from "./Header";
import SinglePost from "./SinglePost";
import { PostsParamProps } from "./PostsParamList";
import { PostsContext } from "../../../context/PostsContext";

function Index({ navigation }: PostsParamProps<"HomeScreen">) {
  const { posts, newFetch } = useContext(PostsContext);
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const addPost = () => {
    navigation.navigate("SelectPhotos");
  };
  const RefreshHandler = () => {
    setRefreshing(true);
    newFetch();
    wait(1000).then(() => setRefreshing(false));
  };
  const renderItem = (item: any) => <SinglePost item={item} />;
  return (
    <View>
      <Header>
        <View style={style.container}>
          <Logo size={48} />
          <Icon
            name="plus-square"
            size={35}
            color="#31B8F0"
            onPress={addPost}
          />
        </View>
      </Header>
      <FlatList
        style={style.flatList}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onRefresh={RefreshHandler}
        refreshing={refreshing}
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
    paddingTop: 20,
    marginBottom: 100,
  },
});
export default Index;
