import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ActiveMilestones from "../screens/ActiveMilestones";
import Profile from "../screens/Profile";

export default function TabNavigator(){
    const Tabs = createBottomTabNavigator();

    return(
        <Tabs.Navigator screenOptions={{headerShown:false}}>
            <Tabs.Screen name="ActiveMilestones" component={ActiveMilestones}></Tabs.Screen>
            <Tabs.Screen name="MyProfile" component={Profile}></Tabs.Screen>
        </Tabs.Navigator>
    )
}