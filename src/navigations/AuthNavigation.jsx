import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/login/LoginScreen";
import Register from "../screens/auth/register/RegisterScreen";

export default function AuthNavigator({ initialRoute = "Login" }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={initialRoute} headerShown={false} screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" options={{title:'Login',headerShown:false}} component={Login}></Stack.Screen>
      <Stack.Screen name="Register" options={{headerTitle:"",headerShown:true,headerStyle:{backgroundColor:'#FFF'},headerShadowVisible: false}} component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
}
