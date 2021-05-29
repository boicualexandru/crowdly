import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import VendorScreen from "@screens/vendor/vendorScreen";
import VendorsScreen from "@screens/vendors/vendorsScreen";

import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "./homeTabs";

type VendorsStackParamList = {
  Vendors: undefined;
  Vendor: { id: string; name: string };
};

type VendorsStackNavigationProp = HomeTabsNavigationPropChild<"VendorsStack">;
type VendorsStackRouteProp = HomeTabsRoutePropChild<"VendorsStack">;

const Stack = createStackNavigator<VendorsStackParamList>();

const VendorsStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vendors" component={VendorsScreen} options={{title: 'Servicii'}} />
      <Stack.Screen
        name="Vendor"
        component={VendorScreen}
        options={{
          headerTransparent: true,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default VendorsStackNavigation;

export type VendorsStackNavigationPropChild<
  RouteName extends keyof VendorsStackParamList
> = CompositeNavigationProp<
  StackNavigationProp<VendorsStackParamList, RouteName>,
  VendorsStackNavigationProp
>;

export type VendorsStackRoutePropChild<
  RouteName extends keyof VendorsStackParamList
> = RouteProp<VendorsStackParamList, RouteName>;
