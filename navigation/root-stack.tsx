import { RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import NewServiceScreen from "../screens/services/new-service";
import HomeTabsNavigation from "./home-tabs";

type RootStackParamList = {
  HomeTabs: undefined;
  NewService: { userId: string };
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen name="HomeTabs" component={HomeTabsNavigation} />
      <Stack.Screen name="NewService" component={NewServiceScreen} />
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
