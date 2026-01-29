import { Text, View, TextInput, Button } from "react-native";

export default function Login() {

  return (
    <View>
      <View>Logo</View>
      <View>
        <Text>Header</Text>
      </View>

      <View>
        <Text>Welcome Back!</Text>
        <View>
          <TextInput placeholder="Email"></TextInput>
          <TextInput placeholder="Password"></TextInput>
          <Button title="Login"></Button>
        </View>
        <View>
          <Text>Don't have an account? Register here.</Text>
        </View>
      </View>
    </View>
  );
}
