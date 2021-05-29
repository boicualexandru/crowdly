import React, { useCallback, useContext } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { AuthActionType } from "@context/authActions";
import { AuthContext } from "@context/authContext";
import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "@navigation/homeTabs";

import Divider from "@components/divider/divider";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

type ProfileScreenNavigationProp = HomeTabsNavigationPropChild<"Profile">;
type ProfileScreenRouteProp = HomeTabsRoutePropChild<"Profile">;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const ProfileScreen = ({ navigation, route }: Props) => {
  const { state, dispatch } = useContext(AuthContext);

  const logout = useCallback(() => {
    dispatch({
      type: AuthActionType.Logout,
    });
    navigation.replace("Login");
  }, []);

  return (
    <ScrollView>
      <View style={styles.profileDetailContainer}>
        <View style={styles.profileImageCircle}>
          <Image
            source={{
              uri:
                "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg",
            }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>Monica Popescu</Text>
      </View>
      <Divider />
      <Pressable style={styles.buttonItem}>
        <Text style={styles.buttonItemText}>Setari de Securitate</Text>
      </Pressable>
      <Pressable style={styles.buttonItem}>
        <Text style={styles.buttonItemText}>Setarile Contului</Text>
      </Pressable>
      <Pressable style={styles.buttonItem} onPress={() => logout()}>
        <Text style={[styles.buttonItemText, { color: "red" }]}>
          Iesi din Cont
        </Text>
      </Pressable>
      {/* <Pressable style={styles.buttonItem}
        onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.buttonItemText, {color: 'green'}]}>Intra in Cont</Text>
      </Pressable> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: ThemeColors.gray,
  },
  buttonItemText: {
    ...ThemeTypography.body1,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
