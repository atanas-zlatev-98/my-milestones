import { createStackNavigator } from "@react-navigation/stack";
import ProjectDetails from "../screens/projects/project-details/ProjectDetails";
import Profile from "../screens/profile/ProfileScreen";

export default function ProfileNavigation() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Profile" options={{headerShown:false}} component={Profile}></Stack.Screen>
            <Stack.Screen name="ProjectDetails" options={{headerShown: true,headerTransparent: true,headerTitle: '', headerTintColor: '#fff'}} component={ProjectDetails}></Stack.Screen>
        </Stack.Navigator>
    )
}