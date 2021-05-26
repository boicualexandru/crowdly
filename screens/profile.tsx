import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "@navigation/home-tabs";
import Button from "@components/button/button";

type ProfileScreenNavigationProp = HomeTabsNavigationPropChild<"Profile">;
type ProfileScreenRouteProp = HomeTabsRoutePropChild<"Profile">;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const ProfileScreen = ({ navigation, route }: Props) => {
  const goToCreateNew = () => navigation.push("EditVendor", { });

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={goToCreateNew}>
        <Text>CREATE NEW</Text>
      </TouchableOpacity>
      <Button
        onPress={() => navigation.navigate("Login")}
        label="Login"
        style={{ marginVertical: 16 }}
      />
    </View>
  );
};

export default ProfileScreen;
