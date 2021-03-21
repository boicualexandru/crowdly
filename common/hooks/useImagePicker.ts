import { ImagePickerOptions } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Platform } from "react-native";

const useImagePicker = (imagePickerOptions?: ImagePickerOptions) => {
  const [images, setImages] = useState<string[]>([]);

  const checkPickerPermisions = useCallback(async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }, []);

  const checkCameraPermisions = useCallback(async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
  }, []);

  const pickImage = useCallback(async () => {
    await checkPickerPermisions();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      ...imagePickerOptions,
    });

    console.log(result);

    if (result.cancelled) return null;

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  }, [images]);

  const takePhoto = useCallback(async () => {
    await checkCameraPermisions();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      ...imagePickerOptions,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  }, [images]);

  const removeImage = useCallback(
    async (index: number) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    },
    [images]
  );

  return { images, removeImage, pickImage, takePhoto };
};

export default useImagePicker;
