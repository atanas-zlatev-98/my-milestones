import { Text, View, TextInput, Image, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator} from "react-native";
import { useState } from "react";
import Button from "../../../components/Button";
import { loginStyle } from "./Login.style";
import { useNavigation } from "@react-navigation/native";
import { KeyRound, Mail } from "lucide-react-native";
import useAuth from "../../../context/auth/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const navigation = useNavigation();

  const { login, error, clearErrors } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async () => {
    clearErrors();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading ? (<SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>

      <View style={loginStyle.container}>
        <View style={loginStyle.content}>
          <Image
            style={loginStyle.logo}
            source={{
              uri: "https://res.cloudinary.com/dcdmmuhf2/image/upload/v1769720604/my-milestones/logo-demo-2_dtu9w7.png",
            }}
          />

          <View style={loginStyle.inputContainer}>
            <Text style={loginStyle.welcomeBackText}>Welcome back!</Text>
            {error.loginError && <Text style={{ color: "red" }}>{error.loginError}</Text>}
            <View style={loginStyle.group}>
              <Text style={loginStyle.groupText}>
                Email
              </Text>

              <View style={loginStyle.iconContainer}>
                <View style={loginStyle.icon}>
                  <Mail size={24} color={"#5458b5"} />
                </View>

                <TextInput
                  style={loginStyle.inputField}
                  placeholder="Enter email..."
                  value={email}
                  onChangeText={setEmail}
                ></TextInput>
              </View>
            </View>

            <View style={loginStyle.group}>
              <Text style={loginStyle.groupText}>
                Password
              </Text>

              <View style={loginStyle.iconContainer}>
                <View style={loginStyle.icon}>
                  <KeyRound size={24} color={"#5458b5"} />
                </View>

                <TextInput
                  secureTextEntry={true}
                  style={loginStyle.inputField}
                  placeholder="Enter password..."
                  value={password}
                  onChangeText={setPassword}
                ></TextInput>
              </View>
            </View>

            <Button
              title="Login"
              style={loginStyle}
              onPress={handleLogin}
            ></Button>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{fontWeight:'bold'}}>
                Don't have an account?{" "}
                <Text style={loginStyle.dontHaveAccount}>Register here.</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>) : (<ActivityIndicator size="large" color="#5458b5" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />)}
    </>
    
  );
}
