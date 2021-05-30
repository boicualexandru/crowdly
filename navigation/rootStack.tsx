import { RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";
import EditVendorScreen from "@screens/editVendorScreen";
import LoginScreen from "@screens/loginScreen";
import RegisterScreen from "@screens/registerScreen";

import HomeTabsNavigation from "./homeTabs";

type RootStackParamList = {
  HomeTabs: undefined;
  EditVendor: { vendorId?: string };
  Login: undefined;
  Register: undefined;
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
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Creeaza un cont nou",
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
