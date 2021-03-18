import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import ThemeColors from "../common/theme/theme-colors";
import ProfileScreen from "../screens/profile";
import ServicesScreen from "../screens/services/services";
import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "./root-stack";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";

type HomeTabsParamList = {
  ServicesStack: undefined;
  Profile: undefined;
};

type HomeTabsNavigationProp = RootStackNavigationPropChild<"HomeTabs">;
type HomeTabsRouteProp = RootStackRoutePropChild<"HomeTabs">;

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabsNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="ServicesStack"
      tabBarOptions={{
        activeTintColor: ThemeColors.primary,
      }}
    >
      <Tab.Screen
        name="ServicesStack"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="star"
              color={color}
              size={size}
              solid={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="user"
              color={color}
              size={size}
              solid={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabsNavigation;

export type HomeTabsNavigationPropChild<
  RouteName extends keyof HomeTabsParamList
> = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabsParamList, RouteName>,
  HomeTabsNavigationProp
>;

export type HomeTabsRoutePropChild<
  RouteName extends keyof HomeTabsParamList
> = RouteProp<HomeTabsParamList, RouteName>;
