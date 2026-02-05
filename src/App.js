import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigations/RootNavigation";
import AuthProvider from "./context/auth/AuthProvider";

export default function App() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#FFF" },
      }}
    >
      <StatusBar style="auto"></StatusBar>
      <AuthProvider>
        <RootNavigator></RootNavigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
