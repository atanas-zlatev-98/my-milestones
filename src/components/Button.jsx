import { TouchableOpacity } from "react-native";

export default function Button({title,onPress,style}){
    return (
        <TouchableOpacity style={style.btn} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}