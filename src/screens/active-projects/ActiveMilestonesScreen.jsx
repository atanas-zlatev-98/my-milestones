import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useProjects from "../../context/projects/useProjects";
import { activeMilestonesStyle } from "./ActiveMilestones.style";
import ActiveMilestonesItem from "./ActiveMilestonesItem";
import { useState, useCallback } from "react";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function ActiveMilestones() {
  
  const { projects, refetchProjects } = useProjects();
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

  return (
    <SafeAreaView>
      <View style={activeMilestonesStyle.header}>
        {/* <Text>asd</Text> */}
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>My Milestones</Text>
        <Text
          style={{
            fontWeight: "bold",
            position: "absolute",
            right: 10,
            alignItems: "center",
          }}
        >
          Active: {notCompletedProjects.length}
        </Text>
      </View>
      {/* <Text>Active MileStones {projects.length}</Text> */}
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
