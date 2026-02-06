import { Text,View} from "react-native"
import Button from "../../components/Button";
import useAuth from "../../context/auth/useAuth";
import { styles } from "./ProfileScreen.style";

export default function Profile(){

    const {user,logout} = useAuth()


    return (
        <View>
        <Text>Profile of {user?.name}</Text>
         <Button title='Logout' style={styles} onPress={logout}></Button>
        </View>
    )
}