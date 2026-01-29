import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigator from "./navigations/RootNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigation from "./navigations/AuthNavigation";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar style="auto"></StatusBar>
      <RootNavigator></RootNavigator>
    </NavigationContainer>
  );
}
