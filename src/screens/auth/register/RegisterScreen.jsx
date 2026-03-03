import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
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
import checkValidation from "../../../validation/checkValidation.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { register, error } = useAuth();

  const handleRegister = async () => {
    setErrors({});

    const validation = checkValidation(registerSchema, {
      imageUri,
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    const profilePictureUrl = await uploadImageToCloudinary(imageUri);
    await register(name, email, password, profilePictureUrl);
    setIsLoading(false);
  };

  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  return (
    <>
      {!isLoading ? (
        <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 0}
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
                  <ImagePicker onImagePicked={setImageUri} imageUri={imageUri} placeholderText="Select a profile picture"></ImagePicker>

                  {errors.imageUri && (<Text style={registerStyle.errorText}>
                      {errors.imageUri}
                    </Text>
                  )}
                </View>

                <View style={registerStyle.groups}>
                  <View style={registerStyle.group}>
                    <Text style={registerStyle.group.label}>Name</Text>

                    {errors.name && (<Text style={registerStyle.errorText}>
                        {errors.name}
                      </Text>
                    )}

                    <View style={{flexDirection: "row", alignItems: "center",gap: 8}}>

                      <View style={registerStyle.iconContainer}>
                        <View style={registerStyle.icon}>
                          <User size={24} color={"#5458b5"} />
                        </View>

                        <TextInput
                          style={registerStyle.inputField}
                          placeholder="Enter your full name..."
                          placeholderTextColor={'#676767'}
                          value={name}
                          onChangeText={setName}
                        ></TextInput>

                      </View>
                    </View>
                  </View>

                  <View style={registerStyle.group}>
                    <Text style={registerStyle.group.label}>Email </Text>

                    {errors.email && (<Text style={registerStyle.errorText}>
                        {errors.email}
                      </Text>
                    )}

                    {error.registerError && (
                      <Text style={registerStyle.errorText}>
                        {error.registerError}
                      </Text>
                    )}

                    <View style={registerStyle.iconContainer}>
                      <View style={registerStyle.icon}>
                        <AtSign size={24} color={"#5458b5"} />
                      </View>

                      <TextInput
                        style={registerStyle.inputField}
                        placeholder="Your email address... "
                        placeholderTextColor={'#676767'}
                        value={email}
                        onChangeText={setEmail}
                      ></TextInput>

                    </View>
                  </View>

                  <View style={registerStyle.group}>
                    <Text style={registerStyle.group.label}>Password</Text>

                    {errors.password && (
                      <Text style={registerStyle.errorText}>
                        {errors.password}
                      </Text>
                    )}

                    <View style={registerStyle.iconContainer}>
                      <View style={registerStyle.icon}>
                        <KeyRound size={24} color={"#5458b5"} />
                      </View>

                      <TextInput
                        secureTextEntry={true}
                        style={registerStyle.inputField}
                        placeholder="Enter password"
                        placeholderTextColor={'#676767'}
                        value={password}
                        onChangeText={setPassword}
                      ></TextInput>

                    </View>
                  </View>

                  <View style={registerStyle.group}>
                    
                    <Text style={registerStyle.group.label}>
                      Confirm Password{" "}
                    </Text>

                    {errors.confirmPassword && (<Text style={registerStyle.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                    <View style={registerStyle.iconContainer}>
                      <View style={registerStyle.icon}>
                        <RotateCcwKey size={24} color={"#5458b5"} />
                      </View>

                      <TextInput
                        secureTextEntry={true}
                        style={registerStyle.inputField}
                        placeholder="Re-enter password"
                        placeholderTextColor={'#676767'}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                      ></TextInput>

                    </View>
                  </View>

                  <Button title="Register" style={registerStyle} onPress={handleRegister} isLoading={isLoading}></Button>

                  <TouchableOpacity onPress={() => navigation.goBack()}>

                    <Text style={{ fontWeight: "bold", marginBottom: 30 }}>
                      {" "}
                      Already registered?{" "}
                      <Text style={registerStyle.dontHaveAccount}>
                        Login here.
                      </Text>

                    </Text>

                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      ) : (
        <ActivityIndicator size="large" color="#5458b5" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}/>
      )}
    </>
  );
}
