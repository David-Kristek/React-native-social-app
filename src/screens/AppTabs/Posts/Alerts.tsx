import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { PostsContext } from "../../../context/PostsContext";
import { Input, Button, Image } from "react-native-elements";

export default function Alerts() {
  const { newFetch, createGroup, joinGroup, groupPassword } =
    useContext(PostsContext);
  const [newGroup, setNewGroup] = useState(false);
  const [groupname, setGroupname] = useState("");
  const [newGroupPassword, setNewGroupPassword] = useState("");
  const [groupPasswordInput, setGroupPasswordInput] = useState("");
  const [err, setErr] = useState("");
  const [err1, setErr1] = useState("");
    return (
        <>
      <ConfirmDialog
        visible={!groupPassword && !newGroup}
        title="Nová skupina"
        positiveButton={{
          title: "Potvrdit",
          onPress: async () => {
            if (!groupPasswordInput) return;
            const res = await joinGroup(groupPasswordInput);
            if (res.name) {
              alert(
                "Gratulujeme úspěšně jste se připojili ke skupině " +
                  res.name +
                  ", která byla vytvořena: " +
                  res.createdBy.name
              );
              newFetch();
            }
            if (res.err) {
              setErr(res.err);
            }
          },
        }}
        negativeButton={{
          title: "Vytvořit novou skupinu",
          onPress: () => setNewGroup(true),
        }}
      >
        <View>
          <Input
            placeholder="Zadejte heslo skupiny"
            onChangeText={(value) => {
              setGroupPasswordInput(value);
            }}
            errorMessage={err}
          />
        </View>
      </ConfirmDialog>
      <ConfirmDialog
        visible={newGroup}
        title="Vytvořit novou skupinu"
        positiveButton={{
          title: "Potvrdit",
          onPress: async () => {
            if (groupname.length < 5 || newGroupPassword.length < 5) {
              setErr1("jméno a heslo musí být delší než pět znaků");
              return;
            }
            const res = await createGroup(groupname, newGroupPassword);
            if (res.msg) {
              alert(
                "Gratulujeme úspěšně jste vytvořil novou skupinu '" +
                  groupname +
                  "', sdílejte heslo s ostatními ať má vaše skupina více členů. "
              );
              newFetch();
            }
            if (res.err) {
              setErr1(res.err);
            }
          },
        }}
        negativeButton={{
          title: "Zpět",
          onPress: () => setNewGroup(false),
        }}
      >
        <View>
          <Input
            placeholder="Vyberte heslo pro skupinu"
            onChangeText={(value) => {
              setNewGroupPassword(value);
            }}
          />
          <Input
            placeholder="Napište název skupiny"
            onChangeText={(value) => {
              setGroupname(value);
            }}
            errorMessage={err1}
          />
        </View>
      </ConfirmDialog>
      </>
    );
  };