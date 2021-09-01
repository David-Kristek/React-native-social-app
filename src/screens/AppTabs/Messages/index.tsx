import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import Header from "../Posts/Header";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Message from "./Message";
import MessageLogic from "../../../context/logic/MessageLogic";
import Time from "./Time";
import { AuthContext } from "../../../context/AuthContext";
function Index() {
  const input = useRef({ value: "" });
  const inputR = useRef<TextInput>(null);
  const { messages, addMessage, groupName } = MessageLogic();
  const { user } = useContext(AuthContext);
  const [lastDate, setLastDate] = useState(0);
  const [numberOfRenderItems, setNumberOfRenderItems] = useState(10);
  // react native usestate inflatlist render item
  const renderItem = useCallback(
    ({ item, index }: any) => {
      if (!messages) return <></>;
      const createdAt = new Date(item.createdAt);
      const lastDateC =
        index < messages.length - 1
          ? new Date(messages[index + 1].createdAt)
          : null;

      return (
        <>
          <Message
            text={item.text}
            type={
              item.sentByUser.email !== user?.email
                ? "my-message"
                : "others-message"
            }
            username={item.sentByUser.name ?? item.sentByUser.username}
          />
          <Time itemDate={createdAt} preDate={lastDateC} />
        </>
      );
    },
    [messages]
  );
  useEffect(() => {
    setNumberOfRenderItems(10);
    return () => {
      setNumberOfRenderItems(10);
    };
  }, []);
  const endReachedHandler = () => {
    setNumberOfRenderItems((cr) => (cr += 5));
  };
  // async storage messages
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={style.headBox}>
          <Text style={style.heading}>{groupName}</Text>
        </View>
      </Header>
      <View style={style.mesContainer}>
        {messages && (
          <FlatList
            data={messages.slice(0, numberOfRenderItems)}
            renderItem={renderItem}
            keyExtractor={(item, index) => "key" + index}
            onEndReachedThreshold={0.1}
            onEndReached={endReachedHandler}
            inverted
          />
        )}
      </View>
      <View style={style.inputBox}>
        <TextInput
          ref={inputR}
          style={style.input}
          onChangeText={(text) => {
            input.current.value = text;
          }}
        />
        <View style={style.butBox}>
          <Button
            icon={<Icon name="send" size={29} color="dodgerblue" />}
            type="clear"
            onPress={() => {
              addMessage(input.current.value);
              inputR.current?.clear();
            }}
            // style={{ backgroundColor: "white" }}
          ></Button>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  heading: {
    fontSize: 25,
  },
  headBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mesContainer: {
    flex: 1,
  },
  inputBox: {
    flexDirection: "row",
  },
  input: {
    height: 46,
    paddingHorizontal: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 20,
    width: "88%",
    backgroundColor: "#f5faff",
    borderRightWidth: 0,
  },
  butBox: {
    borderWidth: 0.5,
    borderLeftColor: "dodgerblue",
  },
});
export default Index;
