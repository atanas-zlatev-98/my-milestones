import { useNavigation } from "@react-navigation/native";
import {View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet} from "react-native";
import {activeMilestonesItemStyle} from "./ActiveMilestonesItem.style";

export default function ActiveMilestonesItem({...project}) {

const completedTasks = project.tasks.filter(task=>task.completed).length;
const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('ProjectDetails', { id: project.id })}>
      <ImageBackground source={{ uri: project.backgroundImage }} resizeMode="cover" style={activeMilestonesItemStyle.bgImage}>
        
        <View style={activeMilestonesItemStyle.container}>

          <View style={{ flexDirection: "row", gap: 10,flex:1 }}>
            <Image source={{ uri: project.icon }} style={{ width: 80, height: 80, borderRadius: 5 }}></Image>
            
            <View style={{ flexDirection: "column",gap: 5,justifyContent: "flex-start"}}>
              <Text style={activeMilestonesItemStyle.fieldText} >{project.field}</Text>
              <Text style={activeMilestonesItemStyle.titleText}>{project.title}</Text>
            </View>

          </View>
           <View style={activeMilestonesItemStyle.completedTasks}>
            <Text style={activeMilestonesItemStyle.tasks}>Completed {completedTasks} / {project.tasks.length}</Text>
            <Text style={activeMilestonesItemStyle.tasks}>Deadline: {new Date(project.deadline).toLocaleDateString()}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
