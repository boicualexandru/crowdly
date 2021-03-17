import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import ThemeColors from "../common/theme/theme-colors";
import ProfileScreen from "../screens/profile";
import ServicesScreen from "../screens/services/services";
import { RootStackNavigationProp, RootStackParamList } from "./root-stack";
import { CompositeNavigationProp } from "@react-navigation/native";

export type HomeTabsParamList = {
  ServicesStack: undefined;
  Profile: undefined;
};

export type HomeTabsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, "HomeTabs">,
  RootStackNavigationProp
>;

const Tab = createBottomTabNavigator();

const HomeTabsNavigation = (props: HomeTabsNavigationProp) => {
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
