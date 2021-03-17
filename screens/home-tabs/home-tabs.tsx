import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React from "react";
import { RootStackParamList } from "../../App";
import ThemeColors from "../../common/theme/theme-colors";
import ProfileScreen from "./profile";
import ServicesScreen from "./services";

export type HomeTabsParamList = {
  Services: undefined;
  Profile: undefined;
};

type HomeTabsNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "HomeTabs"
>;

const Tab = createBottomTabNavigator();

const HomeTabs = (props: HomeTabsNavigationProp) => {
  return (
    <Tab.Navigator
    initialRouteName="Services"
    tabBarOptions={{
      activeTintColor: ThemeColors.primary,

    }}>
      <Tab.Screen name="Services" component={ServicesScreen}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <FontAwesome5 name="star" color={color} size={size} solid={focused} />
        )
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <FontAwesome5 name="user" color={color} size={size} solid={focused} />
        )
      }} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
