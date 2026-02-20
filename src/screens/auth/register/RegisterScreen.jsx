import { KeyboardAvoidingView,Platform,Text,View,TextInput,TouchableOpacity,ScrollView} from "react-native";
import { useState } from "react";
import { registerStyle } from "./Register.style";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { User, AtSign, KeyRound, RotateCcwKey } from "lucide-react-native";
import useAuth from "../../../context/auth/useAuth";
import ImagePicker from "../../../components/ImagePicker/ImagePicker";
import { uploadImageToCloudinary } from "../../../services/cloudinary/uploadImageToCloudinary.js";
import { registerSchema } from "../../../validation/validationSchemas.js";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const {register,error,isLoading} = useAuth();

  const handleRegister = async () => {
    setErrors({});

    const result = registerSchema.safeParse({
      imageUri,
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const formattedErrors = {};

      result.error.issues.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });

      setErrors(formattedErrors);

      return;
    }
    const profilePictureUrl = await uploadImageToCloudinary(imageUri);
    await register(name, email, password, profilePictureUrl);
  };

  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  console.log(isLoading);
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView contentContainerStyle={registerStyle.scrollViewContent}>
          <View>
            <Text style={registerStyle.topText.regText}>Registration</Text>
            <Text style={registerStyle.topText.createAccountText}>
              Create an account
            </Text>
          </View>

          <View style={[registerStyle.content]}>
            <View style={{ marginTop: 30, marginBottom: 10 }}>
              {errors.imageUri && (<Text style={{ color: "red", fontSize: 12, marginBottom: 4,fontWeight:'bold' }}>{errors.imageUri}</Text>)}
              <ImagePicker
                onImagePicked={setImageUri}
                imageUri={imageUri}
              ></ImagePicker>

              {error && <Text style={{ color: "red" }}>{error}</Text>}
            </View>

            <View style={registerStyle.groups}>
              <View style={registerStyle.group}>
                <Text style={registerStyle.group.label}>Name {errors.name && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.name}
                  </Text>
                  
                )}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <View style={registerStyle.iconContainer}>
                    <View style={registerStyle.icon}>
                      <User size={24} color={"#5458b5"} />
                    </View>

                    <TextInput
                      style={registerStyle.inputField}
                      placeholder="Enter your full name..."
                      value={name}
                      onChangeText={setName}
                    ></TextInput>
                  </View>
                </View>
              </View>

              <View style={registerStyle.group}>
                <Text style={registerStyle.group.label}>Email {errors.email && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.email}
                  </Text>
                )}
                </Text>

                <View style={registerStyle.iconContainer}>
                  <View style={registerStyle.icon}>
                    <AtSign size={24} color={"#5458b5"} />
                  </View>

                  <TextInput
                    style={registerStyle.inputField}
                    placeholder="Your email address... "
                    value={email}
                    onChangeText={setEmail}
                  ></TextInput>
                </View>
              </View>

              <View style={registerStyle.group}>
                <Text style={registerStyle.group.label}>Password  {errors.password && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.password}
                  </Text>
                )}</Text>

                <View style={registerStyle.iconContainer}>
                  <View style={registerStyle.icon}>
                    <KeyRound size={24} color={"#5458b5"} />
                  </View>

                  <TextInput
                    secureTextEntry={true}
                    style={registerStyle.inputField}
                    placeholder="Enter password"
                    value={password}
                    onChangeText={setPassword}
                  ></TextInput>
                </View>
              </View>

              <View style={registerStyle.group}>
                <Text style={registerStyle.group.label}>Confirm Password  {errors.confirmPassword && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.confirmPassword}
                  </Text>
                )}</Text>
                <View style={registerStyle.iconContainer}>
                  <View style={registerStyle.icon}>
                    <RotateCcwKey size={24} color={"#5458b5"} />
                  </View>

                  <TextInput
                    secureTextEntry={true}
                    style={registerStyle.inputField}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  ></TextInput>
                </View>
              </View>

              <Button
                title="Register"
                style={registerStyle}
                onPress={handleRegister}
                isLoading={isLoading}
              ></Button>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{fontWeight:'bold'}}>
                  {" "}
                  Already registered?{" "}
                  <Text style={registerStyle.dontHaveAccount}>Login here.</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
