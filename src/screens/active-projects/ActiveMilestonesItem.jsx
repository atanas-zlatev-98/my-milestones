import {View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet} from "react-native";

export default function ActiveMilestonesItem({ backgroundImage,icon, field, title,tasks=[]}) {

const completedTasks = tasks.filter(task=>task.completed).length;

  return (
    <TouchableOpacity>
      <ImageBackground source={{ uri: backgroundImage }} resizeMode="cover"style={styles.bgImage}>
        
        <View style={styles.container}>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image source={{ uri: icon }} style={{ width: 80, height: 80, borderRadius: 5 }}></Image>
            
            <View style={{ flexDirection: "column",gap: 5,justifyContent: "flex-start"}}>
              <Text style={styles.fieldText}>{field}</Text>
              <Text style={styles.titleText}>{title}</Text>
            </View>

          </View>
           <View style={styles.completedTasks}>
            <Text style={{  color: "#5458b5"}}>Completed {completedTasks} / {tasks.length}</Text>
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
  },
  titleText: { fontWeight: "bold", fontSize: 20, color: "#ffffff" },
  completedTasks:{
    alignSelf: "flex-start",
    paddingBottom:2,
    paddingTop:2,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:5,
    color:'#5458b5',
    fontWeight:'bold',
    fontSize:12,
    backgroundColor:'#ffffff'

  }
});
