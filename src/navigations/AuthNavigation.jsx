import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/login/LoginScreen";
import Register from "../screens/auth/register/RegisterScreen";

export default function AuthNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{title:'Login',headerShown:false}} component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
}
