import {
  ImageBackground,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { projectDetailsStyle } from "./ProjectDetails.style";
import ProjectDetailsTaskItem from "./task-item/ProjectDetailsTaskItem";
import Button from "../../../components/Button";
import useProjects from "../../../context/projects/useProjects";
import { useNavigation } from "@react-navigation/native";

export default function ProjectDetails({ route }) {
  const { id } = route.params;
  const { projects, completeProject, deleteProject } = useProjects();
  const navigation = useNavigation();

  const project = projects.find((project) => project.id === id);

  if (!project) {
    return null;
  }

  const completeProjectHandler = async () => {
    await completeProject(project.id);
    navigation.goBack();
  };

  const deleteProjectHandler = async () => {
    await deleteProject(project.id);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 0, margin: 0, alignItems: "center" }}>

      <StatusBar barStyle="light-content" />
      
      <ImageBackground source={{ uri: project.backgroundImage }} resizeMode="cover" style={projectDetailsStyle.bgImage}>
       
        <View style={projectDetailsStyle.container}>
          
          <View style={{ flexDirection: "row", gap: 10 }}>
            
            <Image source={{ uri: project.icon }} style={{ width: 80, height: 80, borderRadius: 5 }}></Image>

            <View style={{flexDirection: "column", gap: 5,justifyContent: "flex-start"}}>
              <Text style={projectDetailsStyle.fieldText}>{project.field}</Text>
              <Text style={projectDetailsStyle.titleText}>{project.title}</Text>
            </View>

          </View>
        </View>

      </ImageBackground>

      <View style={projectDetailsStyle.stats.container}>
        <View>
          
          <Text style={projectDetailsStyle.stats.statsText}>
            Total Task completed:{" "}
            {project.tasks.filter((task) => task.completed).length} /{" "}
            {project.tasks.length}
          </Text>
          
          <Text style={projectDetailsStyle.stats.statsText}>
            Created on: {project.createdAt.toDate().toLocaleDateString()}
          </Text>
          
          <Text style={projectDetailsStyle.stats.statsText}>
            Deadline: {new Date(project.deadline).toLocaleDateString()}
          </Text>
        
        </View>
        
        <View style={{ alignItems: "center", justifyContent: "center", padding: 5 }}>
          {!project.completed && (<Button title="Delete" style={deleteBtnStyle} onPress={deleteProjectHandler}></Button>)}
        </View>
      
      </View>
      
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>

        <View style={projectDetailsStyle.tasks.container}>
          {/* <FlatList data={project.tasks} renderItem={({item,index})=><ProjectDetailsTaskItem {...item} projectId={project.id} isLast={index === project.tasks.length - 1} />} keyExtractor={item=>item.id} contentContainerStyle={{paddingBottom: 50}}></FlatList> */}

          {project.tasks.map((task, index) => (
            <ProjectDetailsTaskItem
              key={task.id}
              {...task}
              projectId={project.id}
              isLast={index === project.tasks.length - 1}
            />
          ))}

        </View>

      </ScrollView>

      <View style={projectDetailsStyle.btnContainer}>
        {project.completed ? (
          <Button title="Delete" style={deleteBtnStyle} onPress={deleteProjectHandler}></Button>
        ) : (
          <Button title="Complete Project"
            style={projectDetailsStyle}
            disabled={ project.tasks.filter((task) => task.completed === true).length !==project.tasks.length}
            onPress={completeProjectHandler}
          ></Button>
        )}
      </View>
    </SafeAreaView>
  );
}

const deleteBtnStyle = StyleSheet.create({
  btn: {
    backgroundColor: "red",
    width: "100%",
    borderRadius: 5,
  },
  btnText: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
});
