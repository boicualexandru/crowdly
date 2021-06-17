import { Feather } from "@expo/vector-icons";
import useUserApi from "api/user";
import { getImageUrlByUserId } from "api/helpers/getImage";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerOptions } from "expo-image-picker";
import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { AuthContext } from "@context/auth/authContext";
import {
  ProfileStackNavigationPropChild,
  ProfileStackRoutePropChild,
} from "@navigation/profileStack";

import Button from "@components/button/button";
import Divider from "@components/divider/divider";
import BigModal from "@components/modal/big-modal";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

type ProfileScreenNavigationProp = ProfileStackNavigationPropChild<"Profile">;
type ProfileScreenRouteProp = ProfileStackRoutePropChild<"Profile">;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const imagePickerOptions: ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
};

const ProfileScreen = ({ navigation, route }: Props) => {
  const { uploadAvatar, logout } = useUserApi();
  const { state } = useContext(AuthContext);
  const [isImagePickerModalOpen, setIsImagePickerModalOpen] = useState(false);

  const userNameToDisplay = useMemo(() => {
    if (!state.user) return "Utilizator";
    if (state.user.firstName && state.user.lastName)
      return `${state.user.firstName} ${state.user.lastName}`;
    return state.user.firstName || state.user.email || "Utilizator";
  }, [state.user]);

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

  const pickImage = useCallback(async (source: "camera" | "library") => {
    setIsImagePickerModalOpen(false);
    await checkPickerPermisions();
    let imagePickerResult =
      source == "camera"
        ? await ImagePicker.launchCameraAsync(imagePickerOptions)
        : await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

    if (imagePickerResult.cancelled) return;

    const apiResponse = await uploadAvatar(imagePickerResult.uri);
  }, []);

  const onLogout = useCallback(async () => {
    await logout();
    navigation.replace("Login");
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      keyboardShouldPersistTaps="always"
    >
      <View>
        <View style={styles.profileDetailContainer}>
          <Pressable
            style={styles.profileImageContainer}
            onPress={() => setIsImagePickerModalOpen(true)}
          >
            <View style={styles.profileImageCircle}>
              {
                state.user?.image ?
                <Image
                  source={{ uri: getImageUrlByUserId(state.user.id, state.user.image) }}
                  style={styles.profileImage}
                /> :
                <Feather name="user" color={ThemeColors.primary} size={46} />
              }
            </View>
            <Feather
              name="edit-2"
              size={12}
              style={styles.profileImageEditIcon}
            />
          </Pressable>
          <Text style={styles.profileName}>{userNameToDisplay}</Text>
        </View>
        <Divider />
        <Pressable style={styles.buttonItem}>
          <Feather name="tag" color={ThemeColors.textDark} size={25} />
          <Text style={styles.buttonItemText}>Biletele Mele</Text>
        </Pressable>
        <Divider />
        <Pressable style={styles.buttonItem}>
          <Feather name="calendar" color={ThemeColors.textDark} size={25} />
          <Text style={styles.buttonItemText}>Evenimentele Mele</Text>
        </Pressable>
        <Divider />
        <Pressable
          style={styles.buttonItem}
          onPress={() => navigation.push("MyVendors")}
        >
          <Feather name="briefcase" color={ThemeColors.textDark} size={25} />
          <Text style={styles.buttonItemText}>Serviciile Mele</Text>
        </Pressable>
        <Divider />
      </View>
      <View>
        <Divider />
        <Pressable
          style={styles.buttonItem}
          onPress={() => navigation.push("ChangePassword")}
        >
          <Feather name="lock" color={ThemeColors.textDark} size={25} />
          <Text style={styles.buttonItemText}>Schimba parola</Text>
        </Pressable>
        <Divider />
        <Pressable
          style={styles.buttonItem}
          onPress={() => navigation.push("UpdateUserDetails")}
        >
          <Feather name="settings" color={ThemeColors.textDark} size={25} />
          <Text style={styles.buttonItemText}>Detaliile Contului</Text>
        </Pressable>
        <Divider />
        <Pressable style={styles.buttonItem} onPress={onLogout}>
          <Feather name="log-out" color="red" size={25} />
          <Text style={[styles.buttonItemText, { color: "red" }]}>
            Iesi din Cont
          </Text>
        </Pressable>
      </View>
      <BigModal
        isOpen={isImagePickerModalOpen}
        requestClose={() => setIsImagePickerModalOpen(false)}
      >
        <View>
          <Button
            label="Fotografiaza"
            leftIcon="camera"
            style={{ width: "100%", marginBottom: 16 }}
            onPress={() => pickImage("camera")}
            iconTheme="Feather"
            outlined
          />
          <Button
            label="Incarca"
            leftIcon="image"
            style={{ width: "100%" }}
            onPress={() => pickImage("library")}
            iconTheme="Feather"
            outlined
          />
        </View>
      </BigModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: "space-between",
    height: "100%",
  },
  profileDetailContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 56,
    paddingBottom: 36,
  },
  profileImageContainer: {
    position: "relative",
    marginVertical: 8,
  },
  profileImageCircle: {
    width: 80,
    height: 80,
    position: "relative",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: ThemeColors.primary,
    borderRadius: 200,
    backgroundColor: ThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  profileImageEditIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: ThemeColors.primary,
    borderRadius: 50,
    padding: 8,
    color: ThemeColors.white,
  },
  profileName: {
    ...ThemeTypography.subtitle1,
    ...ThemeTypographyColorStyles.text_dark_87,
  },
  buttonItem: {
    width: "100%",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 42,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonItemText: {
    ...ThemeTypography.body1,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});

export default ProfileScreen;
