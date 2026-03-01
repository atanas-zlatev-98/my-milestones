import { useNavigation } from "@react-navigation/native";
import {View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet} from "react-native";
import { useEffect } from "react";

export default function ActiveMilestonesItem({fromProfile,...project}) {

const completedTasks = project.tasks.filter(task=>task.completed).length;
const navigation = useNavigation();

const navigateTo = () => {
  if (fromProfile) {
    navigation.navigate('Milestones', { screen: 'ProjectDetails', params: { id: project.id } });
  } else {
    navigation.navigate('ProjectDetails', { id: project.id });
  }
};

useEffect(() => {
    console.log(navigation.getState());
  }, []);

  return (
    <TouchableOpacity onPress={navigateTo}>
      <ImageBackground source={{ uri: project.backgroundImage }} resizeMode="cover" style={styles.bgImage}>
        
        <View style={styles.container}>

          <View style={{ flexDirection: "row", gap: 10,flex:1 }}>
            <Image source={{ uri: project.icon }} style={{ width: 80, height: 80, borderRadius: 5 }}></Image>
            
            <View style={{ flexDirection: "column",gap: 5,justifyContent: "flex-start"}}>
              <Text style={styles.fieldText} >{project.field}</Text>
              <Text style={styles.titleText}>{project.title}</Text>
            </View>

          </View>
           <View style={styles.completedTasks}>
            <Text style={styles.tasks}>Completed {completedTasks} / {project.tasks.length}</Text>
            <Text style={styles.tasks}>Deadline: {new Date(project.deadline).toLocaleDateString()}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#0000007e",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  fieldText: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    color: "#5458b5",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    fontWeight:"bold",
  },
  titleText: { fontWeight: "bold", fontSize: 20, color: "#ffffff", flex:1 },
  completedTasks:{
    alignItems:'flex-end',
    flexDirection:'column',
    justifyContent:'space-between',
    paddingBottom:2,
    paddingTop:2,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:5,
    color:'#5458b5',
    fontWeight:'bold',
    fontSize:12,
  },
  tasks:{
    alignSelf: "flex-end",
    color:'#5458b5',
    fontWeight:'bold',
    fontSize:12,
    paddingBottom:2,
    paddingTop:2,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:5,
    backgroundColor:'#ffffff',
  }
});
