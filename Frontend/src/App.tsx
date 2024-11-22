import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
