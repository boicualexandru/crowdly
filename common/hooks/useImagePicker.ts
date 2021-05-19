import { ImagePickerOptions } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Platform } from "react-native";

const useImagePicker = (imagePickerOptions?: ImagePickerOptions) => {
  const [images, setImages] = useState<{ uri: string; selected: boolean }[]>(
    []
  );
  const [isAnySelected, setIsAnySelected] = useState(false);

  const initImages = (images: string[]) => setImages(images.map(img => ({
    uri: img,
    selected: false
  })));

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

    if (!result.cancelled) {
      setImages([...images, { uri: result.uri, selected: false }]);
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
      setImages([...images, { uri: result.uri, selected: false }]);
    }
  }, [images]);

  const removeSelected = useCallback(async () => {
    const onlyNotSelected = images.filter((image) => !image.selected);
    setImages(onlyNotSelected);
    setIsAnySelected(false);
  }, [images]);

  const setImageSelected = useCallback(
    (index: number, selected: boolean) => {
      const newImages = [...images];
      newImages[index].selected = selected;
      setImages(newImages);
      setIsAnySelected(newImages.some((image) => image.selected));
    },
    [images]
  );

  const selectImage = useCallback(
    (index: number) => setImageSelected(index, true),
    [setImageSelected]
  );

  const unselectImage = useCallback(
    (index: number) => setImageSelected(index, false),
    [setImageSelected]
  );

  return {
    images,
    initImages,
    isAnySelected,
    removeSelected,
    pickImage,
    takePhoto,
    selectImage,
    unselectImage,
  };
};

export default useImagePicker;
