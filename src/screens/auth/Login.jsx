import {Text,View,TextInput,Image,KeyboardAvoidingView,Platform, TouchableOpacity} from "react-native";
import Button from "../../components/Button";
import { loginStyle } from "./Login.style";
import { useNavigation } from "@react-navigation/native";

export default function Login() {

    const navigation = useNavigation();

  return (

    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <View style={loginStyle.container}>
        <View style={loginStyle.content}>
          
          <Image
            style={loginStyle.logo}
            source={{
              uri: "https://res.cloudinary.com/dcdmmuhf2/image/upload/v1769720604/my-milestones/logo-demo-2_dtu9w7.png",
            }}/>

          <View style={loginStyle.inputContainer}>

            <Text style={loginStyle.welcomeBackText}>Welcome back!</Text>
             
            <TextInput style={loginStyle.inputField} placeholder="Email"></TextInput>
            <TextInput style={loginStyle.inputField} placeholder="Password"></TextInput>

            <Button title="Login" style={loginStyle}></Button>

            <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                <Text>Don't have an account? <Text style={loginStyle.dontHaveAccount}>Register here.</Text></Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
