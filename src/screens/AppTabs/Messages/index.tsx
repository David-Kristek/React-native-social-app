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
  const { messages, addMessage, loading, groupName } = MessageLogic();
  const { user } = useContext(AuthContext);
  const [lastDate, setLastDate] = useState(0);
  // react native usestate inflatlist render item
  const renderItem = useCallback(
    ({ item, index }: any) => {
      const createdAt = new Date(item.createdAt).getTime();
      const lastDateC =
        index < messages.length - 1
          ? new Date(messages[index + 1].createdAt).getTime()
          : 0;

      if (createdAt - lastDateC > 600000) {
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
            <Time val={new Date(item.createdAt)} />
          </>
        );
      } else {
        return (
          <Message
            text={item.text}
            type={
              item.sentByUser.email !== user?.email
                ? "my-message"
                : "others-message"
            }
            username={item.sentByUser.name ?? item.sentByUser.username}
          />
        );
      }
    },
    [messages]
  );
  if (!messages || loading) return <></>;
  // async storage messages
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={style.headBox}>
          <Text style={style.heading}>{groupName}</Text>
        </View>
      </Header>
      <View style={style.mesContainer}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => "key" + index}
          inverted
        />
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
