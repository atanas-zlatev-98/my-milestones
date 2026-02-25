import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActiveMilestones from "../screens/ActiveMilestonesScreen";
import Profile from "../screens/profile/ProfileScreen";
import CreateProject from "../screens/projects/create-project/CreateProject";
import { Home, User,CirclePlus } from "lucide-react-native";

export default function TabNavigator() {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
        screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "ActiveMilestones") {
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
      <Tabs.Screen name="ActiveMilestones" component={ActiveMilestones} options={{title:'Milestones'}}></Tabs.Screen>
      <Tabs.Screen name="CreateProject" component={CreateProject} options={{headerTitle:"",headerShown:true,headerStyle:{backgroundColor:'#FFF'},headerShadowVisible: false}}></Tabs.Screen>
      <Tabs.Screen name="MyProfile" component={Profile} options={{title:'My Profile'}}></Tabs.Screen>
    </Tabs.Navigator>
  );
}
