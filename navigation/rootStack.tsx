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
import EditEventScreen from "@screens/editEventScreen";

type RootStackParamList = {
  HomeTabs: undefined;
  EditVendor: { vendorId?: string };
  EditEvent: { eventId?: string };
  Login: undefined;
  Register: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  const { state } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={state.user ? "HomeTabs" : "Login"}
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
        name="EditEvent"
        component={EditEventScreen}
        options={{
          title: "Serviciu Nou",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Conecteaza-te",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Creeaza un cont nou",
          headerShown: false,
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
