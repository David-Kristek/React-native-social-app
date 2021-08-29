import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Logo } from "../../../components/Images";
import Header from "./Header";
import SinglePost from "./SinglePost";
import { PostsParamProps } from "./PostsParamList";
import { PostsContext } from "../../../context/PostsContext";
import Alerts from "./Alerts";

function Index({ navigation }: PostsParamProps<"HomeScreen">) {
  const { posts, newFetch, createGroup, joinGroup, groupPassword } =
    useContext(PostsContext);
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfRenderedPosts, setNumberOfRenderedPosts] = useState(0);
  useEffect(() => {
    setNumberOfRenderedPosts(5);
  }, []);
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const addPost = () => {
    navigation.navigate("SelectPhotos");
  };
  const RefreshHandler = () => {
    setRefreshing(true);
    newFetch();
    setNumberOfRenderedPosts(5);
    wait(1000).then(() => setRefreshing(false));
  };
  const endReachHandler = () => {
    setNumberOfRenderedPosts((curNm) => curNm + 4);
  };

  const renderItem = (item: any) => <SinglePost item={item} />;
  return (
    <>
      <Alerts />
      <View>
        <Header>
          <View style={style.container}>
            <Logo size={48} />
            {groupPassword.length > 0 && (
              <TouchableOpacity onPress={addPost}>
                <Icon name="plus-square" size={35} color="#31B8F0" />
              </TouchableOpacity>
            )}
          </View>
        </Header>
        {groupPassword.length > 0 && (
          <FlatList
            style={style.flatList}
            data={posts?.slice(0, numberOfRenderedPosts)}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            onRefresh={RefreshHandler}
            refreshing={refreshing}
            onEndReached={endReachHandler}
          />
        )}
      </View>
    </>
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
