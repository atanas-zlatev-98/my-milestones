import { TouchableOpacity,Text, StyleSheet } from "react-native";

export default function Button({title,onPress,style}){
    return (
        <TouchableOpacity style={style.btn} onPress={onPress}>
            <Text style={style.btnText}>{title}</Text>
        </TouchableOpacity>
    )
}
