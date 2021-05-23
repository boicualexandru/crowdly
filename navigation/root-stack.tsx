import { RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { AuthContext } from "context/authContext";
import React, { useContext } from "react";

import LoginScreen from "@screens/login";
import EditVendorScreen from "@screens/vendors/edit-vendor";

import HomeTabsNavigation from "./home-tabs";

type RootStackParamList = {
  HomeTabs: undefined;
  EditVendor: { vendorId?: string };
  Login: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  const { state } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={state.isAuthenticated ? "HomeTabs" : "Login"}
    >
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabsNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditVendor"
        component={EditVendorScreen}
        options={{
          title: "Serviciu Nou",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Conecteaza-te",
        }}
      />
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
