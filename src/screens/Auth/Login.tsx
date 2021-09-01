import React, { useContext, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";
import { AuthNavProps } from "./AuthParamList";
import { AuthContext } from "../../context/AuthContext";
import preStyles from "../../styles/main";

type Error = {
  email: string;
  password: string;
  all: string;
};

function Login({ navigation, route }: AuthNavProps<"Login">) {
  const { nowLogin } = route.params;
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Error>({
    email: "",
    password: "",
    all: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrors({ email: "", password: "", all: "" });
    setLoading(true);
    // console.log(login(email, password));
    // const res = login(email, password);
    login(email, password).then((res) => {
      if (res !== "success") setErrors(res);
      setLoading(false);
    });
    // console.log(res);
    // setErrors(res);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/Logo.png")}
        style={{ width: 250, height: 80 }}
      />
      <View style={styles.form}>
        {nowLogin ? (
          <Text style={{ color: "green", textAlign: "center", fontSize: 20 }}>
            Úspěšne zaregistrováni, nyní se přihlašte
          </Text>
        ) : (
          <Text
            style={[preStyles.h2, { paddingLeft: "30%", paddingBottom: 10 }]}
          >
            Přihlašte se
          </Text>
        )}
        <Text style={{ color: "red", textAlign: "center", fontSize: 16 }}>
          {errors.all}
        </Text>
        <Input
          placeholder="Email"
          rightIcon={<Icon name="user" size={24} color="grey" />}
          onChangeText={(value) => {
            setEmail(value);
          }}
          errorMessage={errors.email}
        />
        <Input
          placeholder="Heslo"
          rightIcon={<Icon name="lock" size={24} color="grey" />}
          onChangeText={(value) => {
            setPassword(value);
          }}
          errorMessage={errors.password}
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
                name="key"
                size={20}
                style={{ paddingLeft: 8 }}
                color="dodgerblue"
              />
            }
            iconRight
            onPress={handleSubmit}
          />
        )}
        <Text style={[preStyles.font3, { paddingTop: 10 }]}>
          Ještě nemáte účet?
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
