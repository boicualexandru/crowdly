import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../App";
import { HomeTabsParamList } from "../navigation/home-tabs";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabsParamList, "Profile">,
  StackNavigationProp<RootStackParamList>
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const goToCreateNew = () => navigation.push("NewService", { userId: "asd2" });

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
