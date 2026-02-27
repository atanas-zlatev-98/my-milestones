import { createStackNavigator } from "@react-navigation/stack";
import ActiveMilestones from "../screens/active-projects/ActiveMilestonesScreen";
import ProjectDetails from "../screens/projects/project-details/ProjectDetails";

export default function MilestonesNavigation() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="ActiveMilestones" options={{headerShown:false}} component={ActiveMilestones}></Stack.Screen>
            <Stack.Screen name="ProjectDetails" options={{headerShown: true,headerTransparent: true,headerTitle: '', headerTintColor: '#fff'}} component={ProjectDetails}></Stack.Screen>
        </Stack.Navigator>
    )
}