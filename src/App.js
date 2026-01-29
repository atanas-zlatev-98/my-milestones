import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigations/RootNavigation";
import AuthNavigation from "./navigations/AuthNavigation";

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style="auto"></StatusBar>

      {false ? <RootNavigator></RootNavigator> : <AuthNavigation></AuthNavigation>}

    </NavigationContainer>
  );
}
