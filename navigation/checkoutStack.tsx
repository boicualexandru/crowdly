import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import CheckoutScreen from "@screens/checkoutScreen";

import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "./homeTabs";

type CheckoutStackParamList = {
  Checkout: undefined;
};

type CheckoutStackNavigationProp = HomeTabsNavigationPropChild<"CheckoutStack">;
type CheckoutStackRouteProp = HomeTabsRoutePropChild<"CheckoutStack">;

const Stack = createStackNavigator<CheckoutStackParamList>();

const CheckoutStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Checkout">
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Finalizeaza Selectia" }}
      />
    </Stack.Navigator>
  );
};

export default CheckoutStackNavigation;

export type CheckoutStackNavigationPropChild<
  RouteName extends keyof CheckoutStackParamList
> = CompositeNavigationProp<
  StackNavigationProp<CheckoutStackParamList, RouteName>,
  CheckoutStackNavigationProp
>;

export type CheckoutStackRoutePropChild<
  RouteName extends keyof CheckoutStackParamList
> = RouteProp<CheckoutStackParamList, RouteName>;
