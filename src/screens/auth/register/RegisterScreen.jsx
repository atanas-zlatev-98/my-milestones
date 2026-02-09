import { KeyboardAvoidingView, Platform, Text, View, Image, TextInput, TouchableOpacity, ScrollView} from "react-native";
import { useState } from "react";
import { registerStyle } from "./Register.style";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { User, AtSign, KeyRound, RotateCcwKey} from "lucide-react-native";
import useAuth from "../../../context/auth/useAuth";
import ImagePicker from "../../../components/ImagePicker/ImagePicker";
import {uploadImageToCloudinary} from '../../../services/cloudinary/uploadImageToCloudinary.js';


export default function Register() {

  const {register} = useAuth();

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [imageUri,setImageUri] = useState(null);
  const [confirmPassword,setConfirmPassword] = useState('');

  const handleRegister = async() =>{
    try{
      const profilePictureUrl = await uploadImageToCloudinary(imageUri);
      await register(name,email,password,profilePictureUrl);
    }catch(err){
      console.log(`Error during registration: ${err.message}`)
    }
  }

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={registerStyle.container}>
        <View style={registerStyle.content}>

          <View>
            <ImagePicker onImagePicked={setImageUri} imageUri={imageUri}></ImagePicker>
          </View>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
