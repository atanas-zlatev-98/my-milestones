import { Text, View, Image, TouchableOpacity,FlatList } from "react-native";
import Button from "../../components/Button";
import useAuth from "../../context/auth/useAuth";
import useProjects from "../../context/projects/useProjects";
import { profileStyle } from "./ProfileScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import ActiveMilestonesItem from "../active-projects/ActiveMilestonesItem";

export default function Profile() {

  const { user, logout } = useAuth();
  const {projects} = useProjects();
  const [showCompleted, setShowCompleted] = useState(true);
  const [showTotal, setShowTotal] = useState(false);

  const completedProjects = projects.filter(project => project.completed);
  const totalProjects = projects.filter(project => !project.completed);

  

  return (
    <SafeAreaView>
      <View style={profileStyle.container}>
        <View style={profileStyle.header}>
          <View style={{width:'30%'}}>
          <Button title="Logout" style={profileStyle} onPress={logout}></Button>
          </View>
        </View>
        <Image source={{uri:user.profilePictureUrl}} style={profileStyle.profileImage}></Image>
        <Text style={profileStyle.userText}>{user.name}</Text>

        <View style={profileStyle.userProjects}>

            <TouchableOpacity>
              <Text style={profileStyle.userProjects.text}>Total Projects: {projects.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={profileStyle.userProjects.text}>Completed Projects: {completedProjects.length}</Text>
            </TouchableOpacity>
        </View>

        <View style={{ padding: 10,height:"100%",justifyContent: "center",alignItems: "center" }}>
          {showCompleted && <FlatList
                      data={completedProjects}
                      renderItem={({ item }) => <ActiveMilestonesItem {...item} />}
                      keyExtractor={(item) => item?.id}
                      contentContainerStyle={{ paddingBottom: 50 }}
                    />}
        </View>
      </View>
    </SafeAreaView>
  );
}
