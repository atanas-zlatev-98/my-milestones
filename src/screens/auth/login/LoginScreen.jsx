import {Text,View,TextInput,Image,KeyboardAvoidingView,Platform, TouchableOpacity} from "react-native";
import { useContext, useState } from "react";
import Button from "../../../components/Button";
import { loginStyle } from "./Login.style";
import { useNavigation } from "@react-navigation/native";
import { KeyRound, Mail } from "lucide-react-native";
import { AuthContext } from "../../../context/auth/AuthProvider";

export default function Login() {

    const navigation = useNavigation();

    const {login} = useContext(AuthContext);


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = async() =>{
      await login(email,password);
    }

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
             
              <View style={loginStyle.group}>
                <Text style={loginStyle.groupText}>Email <Text style={{color:'red'}}>*</Text></Text>

                <View style={loginStyle.iconContainer}>

                  <View style={loginStyle.icon}>
                    <Mail size={24} color={'#5458b5'} />
                  </View>

                  <TextInput style={loginStyle.inputField} placeholder="Enter email..." onChangeText={setEmail}></TextInput>
                </View>

              </View>
           
              <View style={loginStyle.group}>
                <Text style={loginStyle.groupText}>Password <Text style={{color:'red'}}>*</Text></Text>

                <View style={loginStyle.iconContainer}>

                  <View style={loginStyle.icon}>
                    <KeyRound size={24} color={'#5458b5'} />
                  </View>

                  <TextInput style={loginStyle.inputField} placeholder="Enter password..." onChangeText={setPassword}></TextInput>
                </View>

              </View>

            <Button title="Login" style={loginStyle} onPress={handleLogin}></Button>

            <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                <Text>Don't have an account? <Text style={loginStyle.dontHaveAccount}>Register here.</Text></Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
