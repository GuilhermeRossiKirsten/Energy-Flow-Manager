import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ManagerScreen from "../screens/ManagerScreen";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Manager: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Manager" component={ManagerScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
