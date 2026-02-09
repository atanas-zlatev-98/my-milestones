export async function uploadImageToCloudinary(imageUri) {

  if (!imageUri) {
    throw new Error('No image provided');
  }

  try {
    const formData = new FormData();

    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append(
      "upload_preset",
      `${process.env.EXPO_PUBLIC_CLOUDINARY_PRESENT_NAME}`,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.secure_url;
    
  } catch (err) {
    throw new Error(`Failed to upload image: ${err.message}`);
  }
}
