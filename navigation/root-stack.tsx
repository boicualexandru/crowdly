import { RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import NewVendorScreen from "@screens/vendors/new-vendor";

import HomeTabsNavigation from "./home-tabs";

type RootStackParamList = {
  HomeTabs: undefined;
  NewVendor: { vendorId?: string };
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabsNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="NewVendor" component={NewVendorScreen} options={{
        title: "Serviciu Nou"
      }} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;

export type RootStackNavigationPropChild<
  RouteName extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, RouteName>;

export type RootStackRoutePropChild<
  RouteName extends keyof RootStackParamList
> = RouteProp<RootStackParamList, RouteName>;
