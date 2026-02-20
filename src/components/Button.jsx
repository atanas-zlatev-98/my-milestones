import { TouchableOpacity,Text } from "react-native";

export default function Button({title,onPress,style,isLoading}) {
    return (
        <TouchableOpacity style={style.btn} onPress={onPress} disabled={isLoading}>
            <Text style={style.btnText}>{isLoading ? "Loading..." : title}</Text>
        </TouchableOpacity>
    )
}
