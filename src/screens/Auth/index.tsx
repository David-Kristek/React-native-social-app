import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import Login from "./Login"; 
import Register from "./Register"; 
import { BaseRouter } from '@react-navigation/routers';

const Stack = createStackNavigator<AuthParamList>();

const AuthStack: React.FC = ({}) => {
    return (
      <Stack.Navigator
        screenOptions={{
          header: () => null
        }}
        initialRouteName="Login"
        // screenOptions={{headerTitleAlign: 'center'}}
      >
        <Stack.Screen
          // options={{
          //   headerTitle: "Sign In"
          // }}
          name="Login"
          component={Login}
          initialParams={{ nowLogin: false }}
        />
        <Stack.Screen
          // options={{
          //   headerTitle: "Sign Up"
          // }}
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    );
  };
export default AuthStack; 