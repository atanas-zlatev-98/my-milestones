import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigation";
import AuthNavigator from "./AuthNavigation";
import useAuth from "../context/auth/useAuth";

export default function RootNavigator() {
  
  const Stack = createStackNavigator();
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="App" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
