import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { AuthNavProps } from "./AuthParamList";
import { AuthContext } from "../../context/AuthContext";
import preStyles from "../../styles/main";
import { Logo } from "../../components/Images";

function Login({ navigation }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgCon}>
        <Logo size={80} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.form}>
          <Text
            style={[preStyles.h2, { paddingLeft: "25%", paddingBottom: 15 }]}
          >
            Zaregistrujte se
          </Text>
          <Input
            placeholder="Jméno"
            rightIcon={<Icon name="user" size={24} color="grey" />}
            onChangeText={(value) => {
              setUsername(value);
            }}
          />
          <Input
            placeholder="Email"
            rightIcon={<Icon name="envelope" size={24} color="grey" />}
            onChangeText={(value) => {
              setUsername(value);
            }}
            // errorMessage="Something bad"
          />
          <Input
            placeholder="Heslo"
            rightIcon={<Icon name="lock" size={24} color="grey" />}
            onChangeText={(value) => {
              setPassword(value);
            }}
            secureTextEntry
          />
          <Input
            placeholder="Potvrďte heslo"
            rightIcon={<Icon name="lock" size={24} color="grey" />}
            onChangeText={(value) => {
              setPassword(value);
            }}
            secureTextEntry
          />
          <Button
            title="Potvrdit"
            type="outline"
            titleStyle={preStyles.btnText1}
            icon={
              <Icon
                name="key"
                size={20}
                style={{ paddingLeft: 8 }}
                color="dodgerblue"
              />
            }
            iconRight
            onPress={() => {
              login();
            }}
          />
          <Text style={[preStyles.font3, { paddingTop: 10 }]}>
            Máte už účet?{" "}
            <Text
              style={preStyles.link}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              přihlašte se
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
  },
  form: {
    width: "95%",
    flex: 1,
    paddingTop: "25%",
  },
  imgCon: {
    flex: 1,
    alignItems: "center",
  },
});
export default Login;