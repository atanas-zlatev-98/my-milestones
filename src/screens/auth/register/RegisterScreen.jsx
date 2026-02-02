import { KeyboardAvoidingView, Platform,Text,View,Image,TextInput,TouchableOpacity} from "react-native";
import { registerStyle } from "./Register.style";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function Register() {

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>

        <View style={registerStyle.container}>
           <View style={registerStyle.content}>
                     
                     <Image
                       style={registerStyle.logo}
                       source={{
                         uri: "https://res.cloudinary.com/dcdmmuhf2/image/upload/v1769720604/my-milestones/logo-demo-2_dtu9w7.png",
                       }}/>
           
                     <View style={registerStyle.inputContainer}>
           
                        <View style={registerStyle.group}>
                          <Text style={registerStyle.groupText}>Name <Text style={{color:'red'}}>*</Text></Text>
                          <TextInput style={registerStyle.inputField} placeholder="Enter your full name... "></TextInput>
                        </View>

                         <View style={registerStyle.group}>
                          <Text style={registerStyle.groupText}>Username <Text style={{color:'red'}}>*</Text></Text>
                          <TextInput style={registerStyle.inputField} placeholder="Enter a username... "></TextInput>
                        </View>

                        <View style={registerStyle.group}>
                          <Text style={registerStyle.groupText}>Email <Text style={{color:'red'}}>*</Text></Text>
                          <TextInput style={registerStyle.inputField} placeholder="Enter your email address... "></TextInput>
                        </View>

                        <View style={registerStyle.group}>
                          <Text style={registerStyle.groupText}>Password <Text style={{color:'red'}}>*</Text></Text>
                          <TextInput style={registerStyle.inputField} placeholder="Enter password"></TextInput>
                        </View>

                        <View style={registerStyle.group}>
                          <Text style={registerStyle.groupText}>Confirm Password <Text style={{color:'red'}}>*</Text></Text>
                          <TextInput style={registerStyle.inputField} placeholder="Confirm password"></TextInput>
                        </View>
           
                       <Button title="Register" style={registerStyle}></Button>
           
                       <TouchableOpacity onPress={()=>navigation.goBack()}>
                           <Text>Already a registered? <Text style={registerStyle.dontHaveAccount}>Login here.</Text></Text>
                       </TouchableOpacity>
           
                     </View>
                   </View>
        </View>

    </KeyboardAvoidingView>
  )
}
