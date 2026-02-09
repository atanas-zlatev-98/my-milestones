import { Text, View, Image } from "react-native";
import Button from "../../components/Button";
import useAuth from "../../context/auth/useAuth";
import { styles } from "./ProfileScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView>
      <View>
        <Text>Profile of {user?.name}</Text>
        <Image
          source={{ uri: user?.profilePictureUrl }}
          style={{ height: 200, width: 200 }}
        ></Image>
        <Button title="Logout" style={styles} onPress={logout}></Button>
      </View>
    </SafeAreaView>
  );
}
