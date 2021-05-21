import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "@navigation/home-tabs";

type ProfileScreenNavigationProp = HomeTabsNavigationPropChild<"Profile">;
type ProfileScreenRouteProp = HomeTabsRoutePropChild<"Profile">;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const goToCreateNew = () => navigation.push("EditVendor", { });

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={goToCreateNew}>
        <Text>CREATE NEW</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
