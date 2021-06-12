import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import Posts from "./Posts";
import Messages from "./Messages"; 
import SelectImages from "../../components/SelectImages";


interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
            return <AntDesign name={"home"} size={size} color={color} />;
          } else if (route.name === "Messages") {
            return <Icon name={"comments"} size={size} color={color} />;
          }
          else if (route.name === "User") {
            return <Icon name={"user"} size={size} color={color} />;
            // or profile photo
          }

          // // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: "dodgerblue",
        inactiveTintColor: "gray"
      }}
    >
      <Tabs.Screen name="Home" component={Posts} />
      <Tabs.Screen name="Messages" component={Messages} />
      <Tabs.Screen name="User" component={Messages} />
    </Tabs.Navigator>
  );
};

export default AppTabs; 