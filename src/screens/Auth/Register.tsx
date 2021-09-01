import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Input, Button, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { AuthNavProps } from "./AuthParamList";
import { AuthContext } from "../../context/AuthContext";
import preStyles from "../../styles/main";
import { Logo } from "../../components/Images";

function Register({ navigation }: AuthNavProps<"Register">) {
  const { register } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [errors, setErrors] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log("onsubmit");
    register({
      name,
      email,
      password,
      password_confirmation,
      setLoading,
    }).then((res) => {
      if (res === "success") {
        navigation.navigate("Login", { nowLogin: true });
      }
      setErrors(res);
      setLoading(false);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgCon}>
        <Logo size={80} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <ScrollView style={styles.form}>
          <Text
            style={[preStyles.h2, { paddingLeft: "25%", paddingBottom: 10, paddingTop: 30 }]}
          >
            Zaregistrujte se
          </Text>
          <Text style={{ color: "red", textAlign: "center", fontSize: 16 }}>
            {errors}
          </Text>
          <Input
            placeholder="Jméno"
            rightIcon={<Icon name="user" size={24} color="grey" />}
            onChangeText={(value) => {
              setName(value);
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
          {loading ? (
            <ActivityIndicator size="large" color="dodgerblue" />
          ) : (
            <Button
              title="Potvrdit"
              type="outline"
              titleStyle={preStyles.btnText1}
              icon={
                <Icon
                  name="user-plus"
                  size={20}
                  style={{ paddingLeft: 8 }}
                  color="dodgerblue"
                />
              }
              iconRight
              onPress={onSubmit}
            />
          )}
          <Text style={[preStyles.font3, { paddingTop: 10 }]}>
            Máte už účet?{" "}
            <Text
              style={preStyles.link}
              onPress={() => {
                navigation.navigate("Login", { nowLogin: false });
              }}
            >
              přihlašte se
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
    // alignItems: "center",
    flex: 1,
  },
  form: {
    width: "95%",
    // flex: 1,
    paddingTop: 0,
    // paddingBottom: 50
  },
  imgCon: {
    paddingTop: 5,
    alignItems: "center",
  },
});
export default Register;
