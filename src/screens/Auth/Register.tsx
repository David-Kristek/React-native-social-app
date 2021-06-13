import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { AuthNavProps } from "./AuthParamList";
import { AuthContext } from "../../context/AuthContext";
import preStyles from "../../styles/main";
import { Logo } from "../../components/Images";

function Register({ navigation }: AuthNavProps<"Register">) {
  const { register } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");

  const onSubmit = (e : any) => {
    e.preventDefault(); 
    register({
      username,
      email,
      password,
      password_confirmation,
      setLoading,
    }).then(res => {
      console.log(res);
    });
  }

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
              setEmail(value);
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
              setpassword_confirmation(value);
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
            onPress={
              onSubmit
            }
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
export default Register;
