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
import VendorsCategoriesScreen from "@screens/vendorsCategoriesScreen";
import { VendorCategoryType } from "api/vendors";
import CheckoutScreen, { CheckoutScreenProps as CheckoutScreenParams } from "@screens/checkoutScreen";

type VendorsStackParamList = {
  VendorsCategories: undefined;
  Vendors: { categoryType: VendorCategoryType, categoryName: string };
  Vendor: { id: string; name: string };
  Checkout: CheckoutScreenParams;
};

type VendorsStackNavigationProp = HomeTabsNavigationPropChild<"VendorsStack">;
type VendorsStackRouteProp = HomeTabsRoutePropChild<"VendorsStack">;

const Stack = createStackNavigator<VendorsStackParamList>();

const VendorsStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="VendorsCategories">
      <Stack.Screen name="VendorsCategories" component={VendorsCategoriesScreen} options={{title: 'Servicii'}} />
      <Stack.Screen name="Vendors" component={VendorsScreen} options={{title: 'Servicii'}} />
      <Stack.Screen
        name="Vendor"
        component={VendorScreen}
        options={{
          headerTransparent: true,
          title: "",
        }}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{title: 'Finalizeaza Selectia'}} />
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
