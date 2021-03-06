import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import ChangePasswordScreen from "@screens/profile/changePasswordScreen";
import MyVendorsScreen from "@screens/profile/myVendorsScreen";
import ProfileScreen from "@screens/profile/profileScreen";
import UpdateUserDetailsScreen from "@screens/profile/updateUserDetailsScreen";
import VendorScreen from "@screens/vendor/vendorScreen";

import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "./homeTabs";
import MyTicketsScreen from "@screens/profile/myTickets";

type ProfileStackParamList = {
  Profile: undefined;
  MyVendors: undefined;
  MyTickets: undefined;
  Vendor: { id: string; name: string };
  UpdateUserDetails: undefined;
  ChangePassword: undefined;
};

type ProfileStackNavigationProp = HomeTabsNavigationPropChild<"ProfileStack">;
type ProfileStackRouteProp = HomeTabsRoutePropChild<"ProfileStack">;

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyVendors"
        component={MyVendorsScreen}
        options={{ title: "Serviciile Mele" }}
      />
      <Stack.Screen
        name="MyTickets"
        component={MyTicketsScreen}
        options={{ title: "Biletele Mele" }}
      />
      <Stack.Screen
        name="Vendor"
        component={VendorScreen}
        options={{
          headerTransparent: true,
          title: "",
        }}
      />
      <Stack.Screen
        name="UpdateUserDetails"
        component={UpdateUserDetailsScreen}
        options={{ title: "Detaliile Contului" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "Schimba Parola" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigation;

export type ProfileStackNavigationPropChild<
  RouteName extends keyof ProfileStackParamList
> = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList, RouteName>,
  ProfileStackNavigationProp
>;

export type ProfileStackRoutePropChild<
  RouteName extends keyof ProfileStackParamList
> = RouteProp<ProfileStackParamList, RouteName>;
