import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigations/RootNavigation";
import AuthProvider from "./context/auth/AuthProvider";
import ProjectsProvider from "./context/projects/ProjectsProvider";

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
        <ProjectsProvider>
          <RootNavigator></RootNavigator>
        </ProjectsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
