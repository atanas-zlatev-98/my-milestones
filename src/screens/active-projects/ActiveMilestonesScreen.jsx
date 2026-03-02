import { FlatList, Text, View,ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { activeMilestonesStyle } from "./ActiveMilestones.style";
import { useState, useCallback } from "react";
import Button from "../../components/Button";
import ActiveMilestonesItem from "./ActiveMilestonesItem";
import useProjects from "../../context/projects/useProjects";

export default function ActiveMilestones() {
  
  const { projects, refetchProjects,isLoading } = useProjects();
  const [refreshProjects, setRefreshProjects] = useState(false);
  const navigation = useNavigation();

  const onRefresh = useCallback(async () => {
    setRefreshProjects(true);
    try {
      await refetchProjects();
    } finally {
      setRefreshProjects(false);
    }
  }, [refetchProjects]);

  const notCompletedProjects = projects.filter((project) => !project.completed);

  if(isLoading || !notCompletedProjects){
    return (<ActivityIndicator size="large" style={{flex:1,justifyContent:'center',alignItems:'center'}}></ActivityIndicator>)
  }

  return (
    <SafeAreaView>
      <View style={activeMilestonesStyle.header}>
    
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>My Milestones</Text>

        <Text style={{ fontWeight: "bold", position: "absolute", right: 10,alignItems: "center"}}>
          Active: {notCompletedProjects.length}
        </Text>

      </View>

      <View style={{ padding: 10,height:"100%",justifyContent: "center",alignItems: "center" }}>
        
        {notCompletedProjects.length === 0 ? (
          <View style={activeMilestonesStyle.activeProjects}>
            
            <Text style={activeMilestonesStyle.text}>
              No active Projects
            </Text>

            <Button title="Create New Project" style={activeMilestonesStyle} onPress={() => navigation.navigate("CreateProject")} />
          </View>
        ) : (
          <FlatList
            refreshing={refreshProjects}
            onRefresh={onRefresh}
            data={notCompletedProjects}
            renderItem={({ item }) => <ActiveMilestonesItem {...item} />}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
