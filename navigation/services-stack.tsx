import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import ServiceScreen from "../screens/services/service";
import ServicesScreen from "../screens/services/services";
import { HomeTabsNavigationProp, HomeTabsParamList } from "./home-tabs";

export type ServicesStackParamList = {
  Services: undefined;
  Service: { id: string };
};

export type ServicesStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeTabsParamList, "ServicesStack">,
  HomeTabsNavigationProp
>;

const Stack = createStackNavigator<ServicesStackParamList>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="Service" component={ServiceScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
