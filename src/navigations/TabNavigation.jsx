import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActiveMilestones from "../screens/active-projects/ActiveMilestonesScreen";
import Profile from "../screens/profile/ProfileScreen";
import CreateProject from "../screens/projects/create-project/CreateProject";
import { Home, User,CirclePlus } from "lucide-react-native";
import MilestonesNavigation from "./MilestonesNavigation";

export default function TabNavigator() {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
        screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Milestones") {
            return (
              <Home color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
            );
          }

          if (route.name === "CreateProject") {
            return (
              <CirclePlus color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
            );
          }

           if (route.name === "MyProfile") {
            return (
              <User color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
            );
          }

        },
        tabBarActiveTintColor: "#5458b5",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="Milestones" component={MilestonesNavigation}></Tabs.Screen>
      <Tabs.Screen name="CreateProject" component={CreateProject} options={{headerTitle:"",headerShown:true,headerStyle:{backgroundColor:'#FFF'},headerShadowVisible: false}}></Tabs.Screen>
      <Tabs.Screen name="MyProfile" component={Profile} options={{title:'My Profile'}}></Tabs.Screen>
    </Tabs.Navigator>
  );
}
