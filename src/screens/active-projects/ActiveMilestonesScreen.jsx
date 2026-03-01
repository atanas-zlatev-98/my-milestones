import { FlatList, Text,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useProjects from "../../context/projects/useProjects";
import { activeMilestonesStyle } from "./ActiveMilestones.style";
import ActiveMilestonesItem from "./ActiveMilestonesItem";
import { useState, useCallback } from "react";

export default function ActiveMilestones() {

  const {projects,refetchProjects} = useProjects();
  const [refreshProjects,setRefreshProjects] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshProjects(true);
    try{
      await refetchProjects();
    }finally {
      setRefreshProjects(false);
    }
},[refetchProjects]);

  return (
    <SafeAreaView>
      <View style={activeMilestonesStyle.header}>
        {/* <Text>asd</Text> */}
        <Text style={{fontWeight:'bold',fontSize:20}}>My Milestones</Text>
        <Text style={{fontWeight:'bold',position:'absolute',right:10,alignItems:'center'}}>Active: {projects.length}</Text>
      </View>
      {/* <Text>Active MileStones {projects.length}</Text> */}
      <View style={{padding:10}}>
          <FlatList refreshing={refreshProjects} onRefresh={onRefresh} data={projects} renderItem={({item})=><ActiveMilestonesItem {...item}/>} keyExtractor={item=>item?.id} contentContainerStyle={{paddingBottom: 50}}/>
      </View>
    </SafeAreaView>
  );
}
