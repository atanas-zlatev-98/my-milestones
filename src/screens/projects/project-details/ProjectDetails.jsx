import { ImageBackground, Text, View,StatusBar, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { projectDetailsStyle } from "./ProjectDetails.style";
import { FlatList } from "react-native-gesture-handler";
import ProjectDetailsTaskItem from "./task-item/ProjectDetailsTaskItem";
import Button from "../../../components/Button";

export default function ProjectDetails({route}) {
    const project = route.params;

    const completeProjectHandler = () => {

    }

    return(
        <SafeAreaView style={{flex:1,padding:0,margin:0,alignItems:'center'}}>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={{ uri: project.backgroundImage }} resizeMode="cover" style={projectDetailsStyle.bgImage}>
                  <View style={projectDetailsStyle.container}>
                
                          <View style={{ flexDirection: "row", gap: 10 }}>
                            <Image source={{ uri: project.icon }} style={{ width: 80, height: 80, borderRadius: 5 }}></Image>
                            
                            <View style={{ flexDirection: "column",gap: 5,justifyContent: "flex-start"}}>
                              <Text style={projectDetailsStyle.fieldText}>{project.field}</Text>
                              <Text style={projectDetailsStyle.titleText}>{project.title}</Text>
                            </View>
                
                          </View>
                        </View>
            </ImageBackground>
            <View style={projectDetailsStyle.stats.container}>
                <Text style={projectDetailsStyle.stats.statsText}>Total Task completed: {project.tasks.filter(task => task.completed).length} / {project.tasks.length}</Text>
                <Text style={projectDetailsStyle.stats.statsText}>Created on: {project.createdAt.toDate().toLocaleDateString()}</Text>
                <Text style={projectDetailsStyle.stats.statsText}>Deadline: {new Date(project.deadline).toLocaleDateString()}</Text>
            </View>
            <View style={projectDetailsStyle.tasks.container}>
                <FlatList data={project.tasks} renderItem={({item,index})=><ProjectDetailsTaskItem {...item} isLast={index === project.tasks.length - 1} />} keyExtractor={item=>item.id}></FlatList>
            </View>

            <View style={projectDetailsStyle.btnContainer}>
              <Button title="Complete Project" style={projectDetailsStyle} onPress={completeProjectHandler}></Button>
            </View>
        </SafeAreaView>
    )

}