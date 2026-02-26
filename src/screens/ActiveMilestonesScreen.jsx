import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useProjects from "../context/projects/useProjects";

export default function ActiveMilestones() {

  const {projects} = useProjects();
  return (
    <SafeAreaView>
      <Text>Active MileStones {projects.length}</Text>
    </SafeAreaView>
  );
}
