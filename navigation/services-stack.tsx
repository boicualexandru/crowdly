import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import ServiceScreen from "../screens/services/service";
import ServicesScreen from "../screens/services/services";
import { HomeTabsNavigationPropChild, HomeTabsRoutePropChild } from "./home-tabs";

type ServicesStackParamList = {
  Services: undefined;
  Service: { id: string };
};

type ServicesStackNavigationProp = HomeTabsNavigationPropChild<"ServicesStack">;
type ServicesStackRouteProp = HomeTabsRoutePropChild<"ServicesStack">;

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

export type ServicesStackNavigationPropChild<
  RouteName extends keyof ServicesStackParamList
> = CompositeNavigationProp<
  StackNavigationProp<ServicesStackParamList, RouteName>,
  ServicesStackNavigationProp
>;

export type ServicesStackRoutePropChild<
  RouteName extends keyof ServicesStackParamList
> = RouteProp<ServicesStackParamList, RouteName>;
