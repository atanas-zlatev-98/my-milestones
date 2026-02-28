import { BadgeAlert, BadgeCheck, Dot } from "lucide-react-native/icons";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { projectDetailsTaskItemStyles } from "./ProjectDetailsTaskItem.style";
import ProjectDetailsTaskItemModal from "../task-item-modal/ProjectDetailsTaskItemModal";

export default function ProjectDetailsTaskItem({projectId, isLast, ...task }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={[ projectDetailsTaskItemStyles.topView,{ paddingBottom: isLast ? 10 : 0 }]}>

          <View style={projectDetailsTaskItemStyles.tasks.container}>
            <View style={projectDetailsTaskItemStyles.tasks.taskItem}>
              <View style={projectDetailsTaskItemStyles.tasks.taskItemTextTitle}>

                {task.completed ? (
                  <BadgeCheck color="green" />
                ) : (
                  <BadgeAlert color="red" />
                )}

                <Text style={{ fontWeight: "bold" }}>{task.title}</Text>
              </View>

              <View>
                <Text style={{ fontWeight: "bold" }}>

                  {task.completedOn
                    ? new Date(task.completedOn).toLocaleDateString()
                    : "Not completed"}

                </Text>
              </View>
            </View>

            {!isLast && (

              <View style={{ flexDirection: "column" }}>
                <Text> <Dot color="gray"></Dot> </Text>
                <Text> <Dot color="gray"></Dot> </Text>
              </View>
            )}

          </View>
        </View>
      </TouchableOpacity>
            <ProjectDetailsTaskItemModal visible={modalVisible} onClose={()=>setModalVisible(false)} taskData={task} projectId={projectId}></ProjectDetailsTaskItemModal>
    </View>
  );
}