import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import ServiceScreen from "../screens/services/service/service";
import ServicesScreen from "../screens/services/services";
import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "./home-tabs";

type ServicesStackParamList = {
  Services: undefined;
  Service: { id: string; name: string };
};

type ServicesStackNavigationProp = HomeTabsNavigationPropChild<"ServicesStack">;
type ServicesStackRouteProp = HomeTabsRoutePropChild<"ServicesStack">;

const Stack = createStackNavigator<ServicesStackParamList>();

const ServicesStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ServicesStackNavigation;

export type ServicesStackNavigationPropChild<
  RouteName extends keyof ServicesStackParamList
> = CompositeNavigationProp<
  StackNavigationProp<ServicesStackParamList, RouteName>,
  ServicesStackNavigationProp
>;

export type ServicesStackRoutePropChild<
  RouteName extends keyof ServicesStackParamList
> = RouteProp<ServicesStackParamList, RouteName>;
