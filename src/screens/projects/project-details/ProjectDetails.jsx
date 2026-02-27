import { ImageBackground, Text, View,StatusBar, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { projectDetailsStyle } from "./ProjectDetails.style";
export default function ProjectDetails({route}) {
    const project = route.params;
    return(
        <SafeAreaView style={{flex:1,padding:0,margin:0}}>
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
        </SafeAreaView>
    )

}