import { TouchableOpacity,Text } from "react-native";

export default function Button({title,onPress,style,isLoading,disabled}) {
    return (
        <TouchableOpacity style={disabled ? style.btnDisabled : style.btn} onPress={onPress} disabled={disabled}>
            <Text style={style.btnText}>{isLoading ? "Loading..." : title}</Text>
        </TouchableOpacity>
    )
}
