import { createStackNavigator } from "@react-navigation/stack"
import TabNavigator from "./TabNavigation";

export default function RootNavigator(){

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigator" component={TabNavigator}></Stack.Screen>
        </Stack.Navigator>
    )
}