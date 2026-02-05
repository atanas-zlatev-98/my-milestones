import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigation";
import AuthNavigator from "./AuthNavigation";
import useAuth from "../context/auth/useAuth";

export default function RootNavigator() {
  const Stack = createStackNavigator();
  const {isAuthenticated} = useAuth();
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name="TabNavigator" component={TabNavigator} ></Stack.Screen>
    ) : (
        <Stack.Screen name="AuthNavigator" options={{headerShown:false}} component={AuthNavigator}></Stack.Screen>
    )}
    </Stack.Navigator>
  );
}
