import { KeyboardAvoidingView, Platform, Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import { useState } from "react";
import { registerStyle } from "./Register.style";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { User, AtSign, KeyRound, RotateCcwKey} from "lucide-react-native";
import useAuth from "../../../context/auth/useAuth";


export default function Register() {

  const {register} = useAuth();

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const handleRegister = async() =>{
    await register(name,email,password);
  }

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={registerStyle.container}>
        <View style={registerStyle.content}>

          <Image
            style={registerStyle.logo}
            source={{
              uri: "https://res.cloudinary.com/dcdmmuhf2/image/upload/v1769720604/my-milestones/logo-demo-2_dtu9w7.png",
            }}
          />

          <View style={registerStyle.inputContainer}>
            
            <View style={{marginBottom:10}}>
            <Text style={registerStyle.signUpText}>Sign Up!</Text>
            <Text style={{color:'#0000006a'}}>All fields with <Text style={{color:'red'}}>*</Text> are required.</Text>
            </View>

            <View style={registerStyle.group}>
              <Text style={registerStyle.groupText}> Name <Text style={{ color: "red" }}>*</Text></Text>

              <View style={registerStyle.iconContainer}>
                
                <View style={registerStyle.icon}>
                  <User size={24} color={"#5458b5"} />
                </View>

                <TextInput style={registerStyle.inputField} placeholder="Enter your full name..." onChangeText={setName}></TextInput>
              </View>
            </View>

            <View style={registerStyle.group}>
              <Text style={registerStyle.groupText}> Email <Text style={{ color: "red" }}>*</Text></Text>
              
               <View style={registerStyle.iconContainer}>
                
                <View style={registerStyle.icon}>
                  <AtSign size={24} color={"#5458b5"} />
                </View>

                 <TextInput style={registerStyle.inputField} placeholder="Your email address... " onChangeText={setEmail}></TextInput>
              </View>

             
            </View>

            <View style={registerStyle.group}>
              <Text style={registerStyle.groupText}> Password <Text style={{ color: "red" }}>*</Text></Text>

               <View style={registerStyle.iconContainer}>
                
                <View style={registerStyle.icon}>
                  <KeyRound size={24} color={"#5458b5"} />
                </View>

                <TextInput secureTextEntry={true} style={registerStyle.inputField} placeholder="Enter password" onChangeText={setPassword}></TextInput>
              </View>
            </View>

            <View style={registerStyle.group}>
              <Text style={registerStyle.groupText}>Confirm Password <Text style={{ color: "red" }}>*</Text></Text>

               <View style={registerStyle.iconContainer}>
                
                <View style={registerStyle.icon}>
                  <RotateCcwKey size={24} color={"#5458b5"} />
                </View>

                <TextInput secureTextEntry={true} style={registerStyle.inputField} placeholder="Re-enter password" onChangeText={setConfirmPassword}></TextInput>
              </View>

            </View>

            <Button title="Register" style={registerStyle} onPress={handleRegister}></Button>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text> Already a registered?{" "}<Text style={registerStyle.dontHaveAccount}>Login here.</Text></Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
