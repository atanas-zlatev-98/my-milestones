import { Text, View, Image, TouchableOpacity,FlatList, ActivityIndicator } from "react-native";
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
  const notCompleted = projects.filter(project => !project.completed);  

  const handleTotalProjects = () => {
    setShowTotal(true);
    setShowCompleted(false);
  };

  const handleCompletedProjects = () => {
    setShowTotal(false);
    setShowCompleted(true);
  };

  if (!user){
    return (<ActivityIndicator size="large" color="#0000ff" style={{flex:1,justifyContent:'center',alignItems:'center'}}></ActivityIndicator>)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={profileStyle.container}>

        <Image source={{uri:user.profilePictureUrl}} style={profileStyle.profileImage}></Image>
        <Text style={profileStyle.userText}>{user.name}</Text>

        <View style={profileStyle.userProjects}>

            <TouchableOpacity onPress={handleTotalProjects}>
              <Text style={[profileStyle.userProjects.text, showTotal ? profileStyle.active : null]}>Upcoming: {notCompleted.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCompletedProjects}>
              <Text style={[profileStyle.userProjects.text, showCompleted ? profileStyle.active : null]}>Completed: {completedProjects.length}</Text>
            </TouchableOpacity>
        </View>

        <View style={{ padding: 10,flex:1 }}>
          {showCompleted && completedProjects.length === 0 && <Text style={{fontSize:16,fontStyle:'italic'}}>No completed projects yet...</Text>}
          {showCompleted && <FlatList
                      data={completedProjects}
                      renderItem={({ item }) => <ActiveMilestonesItem {...item} />}
                      keyExtractor={(item) => item?.id}
                      contentContainerStyle={{ paddingBottom: 50, }}
                    />}
                    
          {showTotal && notCompleted.length === 0 && <Text style={{fontSize:16,fontStyle:'italic'}}>No upcoming projects yet...</Text>}
          {showTotal && <FlatList
                      data={notCompleted}
                      renderItem={({ item }) => <ActiveMilestonesItem {...item} />}
                      keyExtractor={(item) => item?.id}
                      contentContainerStyle={{ paddingBottom: 50, }}
                    />}
        </View>
            <View style={profileStyle.header}>
              <View style={{width:'30%'}}>
                <Button title="Logout" style={profileStyle} onPress={logout}></Button>
            </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
}
