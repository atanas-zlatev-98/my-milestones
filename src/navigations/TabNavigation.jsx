import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateProject from "../screens/projects/create-project/CreateProject";
import { Home, User, CirclePlus } from "lucide-react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MilestonesNavigation from "./MilestonesNavigation";
import ProfileNavigation from "./ProfileNavigation";

export default function TabNavigator() {

  const Tabs = createBottomTabNavigator();

  const getTabBarVisibility = (route) => {

    const routeName = getFocusedRouteNameFromRoute(route);
    
    if (routeName === "ProjectDetails") {
      return { display: "none" };
    }
    return {};
  };
  
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {

          if (route.name === "Milestones") {
            return ( <Home color={color} size={size} strokeWidth={focused ? 2.5 : 2} /> );
          }

          if (route.name === "CreateProject") {
            return (<CirclePlus color={color} size={size} strokeWidth={focused ? 2.5 : 2}/>);
          }

          if (route.name === "MyProfile") {
            return ( <User color={color} size={size} strokeWidth={focused ? 2.5 : 2} />);
          }
        },
        tabBarActiveTintColor: "#5458b5",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="Milestones" component={MilestonesNavigation} 
        options={({ route }) => ({ tabBarStyle: getTabBarVisibility(route) })}>
      </Tabs.Screen>

      <Tabs.Screen name="CreateProject" component={CreateProject}
        options={{
          title: "Create Project",
          headerTitle: "",
          headerShown: true,
          headerStyle: { backgroundColor: "#FFF" },
          headerShadowVisible: false}}>
      </Tabs.Screen>

      <Tabs.Screen name="MyProfile" component={ProfileNavigation} options={({ route }) => ({ tabBarStyle: getTabBarVisibility(route),title:'My Profile' })}></Tabs.Screen>

    </Tabs.Navigator>
  );
}
