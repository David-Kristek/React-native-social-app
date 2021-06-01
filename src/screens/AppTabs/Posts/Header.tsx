// rnf
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header: React.FC = ({ children }) => {
  return <View style={style.container}>{children}</View>;
};
const style = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    paddingTop: 30,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
export default Header;
