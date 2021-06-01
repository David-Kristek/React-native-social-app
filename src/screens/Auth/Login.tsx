import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";
import { AuthNavProps } from "./AuthParamList";
import { AuthContext } from "../../context/AuthContext";
import preStyles from "../../styles/main";

function Login({ navigation }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/Logo.png")}
        style={{ width: 250, height: 80 }}
      />
      <View style={styles.form}>
        <Text style={[preStyles.h2, { paddingLeft: "30%", paddingBottom: 15 }]}>
          Přihlašte se
        </Text>
        <Input
          placeholder="Jméno"
          rightIcon={<Icon name="user" size={24} color="grey" />}
          onChangeText={(value) => {
            setUsername(value);
          }}
        />
        <Input
          placeholder="Heslo"
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
          Ještě nemáte účet?{" "}
          <Text
            style={preStyles.link}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            zaregistrujte se
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "20%",
  },
  form: {
    width: "95%",
    flex: 1,
    paddingTop: "25%",
  },
});
export default Login;
