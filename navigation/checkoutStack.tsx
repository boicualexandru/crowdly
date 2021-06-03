import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from 'react-native';

import CheckoutScreen from "@screens/checkoutScreen";

import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "./homeTabs";
import IconButton from "@components/button/icon-button";
import ThemeColors from "@theme/theme-colors";
import { CheckoutContext } from "@context/checkout/checkoutContext";
import { CheckoutActionType } from "@context/checkout/checkoutActions";
import PaymentScreen from "@screens/paymentScreen";

type CheckoutStackParamList = {
  Checkout: undefined;
  Payment: undefined;
};

type CheckoutStackNavigationProp = HomeTabsNavigationPropChild<"CheckoutStack">;
type CheckoutStackRouteProp = HomeTabsRoutePropChild<"CheckoutStack">;

const Stack = createStackNavigator<CheckoutStackParamList>();

const CheckoutStackNavigation = () => {
  const { dispatch: checkoutDispatch } = useContext(CheckoutContext);

  return (
    <Stack.Navigator initialRouteName="Checkout">
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ 
          title: "Finalizeaza Selectia",
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <IconButton 
                icon="trash-2" 
                color={ThemeColors.primary}
                theme="Feather"
                size={18}
                onPress={() => checkoutDispatch({type: CheckoutActionType.ClearCheckout})}
              />
            </View>
          )
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ 
          title: "Plata",
        }}
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
