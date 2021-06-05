import { Feather } from "@expo/vector-icons";
import { getImageUrlByUserId } from "api/helpers/getImage";
import React, { useCallback, useContext, useMemo } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { AuthActionType } from "@context/auth/authActions";
import { AuthContext } from "@context/auth/authContext";
import {
  ProfileStackNavigationPropChild,
  ProfileStackRoutePropChild,
} from "@navigation/profileStack";

import Divider from "@components/divider/divider";

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

const ProfileScreen = ({ navigation, route }: Props) => {
  const { state, dispatch } = useContext(AuthContext);

  const userNameToDisplay = useMemo(() => {
    if (!state.user) return "Utilizator";
    if (state.user.firstName && state.user.lastName)
      return `${state.user.firstName} ${state.user.lastName}`;
    return state.user.firstName || state.user.email || "Utilizator";
  }, [state.user]);

  const avatarImageUrl = useMemo(() => {
    if (!state.user || !state.user.image)
      return "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg";
    return getImageUrlByUserId("", state.user?.image);
  }, [state.user]);

  const logout = useCallback(() => {
    dispatch({
      type: AuthActionType.Logout,
    });
    navigation.replace("Login");
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      keyboardShouldPersistTaps="always"
    >
      <View>
        <View style={styles.profileDetailContainer}>
          <View style={styles.profileImageCircle}>
            <Image
              source={{ uri: avatarImageUrl }}
              style={styles.profileImage}
            />
          </View>
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
        <Pressable style={styles.buttonItem} onPress={() => logout()}>
          <Feather name="log-out" color="red" size={25} />
          <Text style={[styles.buttonItemText, { color: "red" }]}>
            Iesi din Cont
          </Text>
        </Pressable>
      </View>
      {/* <Pressable style={styles.buttonItem}
        onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.buttonItemText, {color: 'green'}]}>Intra in Cont</Text>
      </Pressable> */}
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
  profileImageCircle: {
    width: 80,
    height: 80,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "green",
    borderWidth: 2,
    borderColor: ThemeColors.primary,
    borderRadius: 200,
    marginVertical: 8,
  },
  profileImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
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
