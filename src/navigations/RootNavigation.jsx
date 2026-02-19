import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigation";
import AuthNavigator from "./AuthNavigation";
import useAuth from "../context/auth/useAuth";
import { ActivityIndicator } from "react-native";

export default function RootNavigator() {
  
  const Stack = createStackNavigator();
  const { isAuthenticated,isLoading } = useAuth();

  if(isLoading){
    return (
      <ActivityIndicator size="large" style={{flex:1,justifyContent:'center',alignItems:'center'}}></ActivityIndicator>
    )
  }

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
