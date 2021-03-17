import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import NewServiceScreen from "../screens/services/new-service";
import HomeTabsNavigation from "./home-tabs";

export type RootStackParamList = {
  HomeTabs: undefined;
  NewService: { userId: string };
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

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
