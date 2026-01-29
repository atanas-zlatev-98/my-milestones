import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";

export default function AuthNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{title:'Login'}} component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
}
