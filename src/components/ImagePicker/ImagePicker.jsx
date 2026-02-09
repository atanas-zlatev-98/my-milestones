import { View, Text, TouchableOpacity, Image } from "react-native";
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync} from "expo-image-picker";
import { styles } from "./ImagePicker.style";
import { ImagePlus, RotateCw } from "lucide-react-native";

export default function ImagePicker({ imageUri, onImagePicked }) {

  const requestPermission = async () => {

    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied! Library permission is needed to use this feature.");
      return false;
    }

    return true;
  };

  const pickImageHandler = async () => {

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      return;
    }

    const result = await launchImageLibraryAsync({
      quality: 0.3,
    });

    onImagePicked(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.picker} onPress={pickImageHandler}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <ImagePlus size={48} color="#5458b5" />
            <Text style={styles.placeholderText}>Select a profile picture</Text>
          </View>
        )}
      </TouchableOpacity>

      {imageUri && (
        <TouchableOpacity style={styles.changeButton} onPress={pickImageHandler}>
          <RotateCw name="refresh" size={16} color="#6366f1" />
          <Text style={styles.changeText}>Change Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
