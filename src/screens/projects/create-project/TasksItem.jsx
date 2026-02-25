import { View, Text, TouchableOpacity } from "react-native";

export default function TasksItem({ id, title, onDelete }) {
  
    return (
    <TouchableOpacity onPress={() => onDelete(id)}>
      <View>
        <Text style={{ backgroundColor: "#f7f7f7", padding: 5, borderRadius: 5,fontWeight:'bold',fontSize:16 }}>
          {title} <Text style={{ color: "red" }}>{`x`}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
