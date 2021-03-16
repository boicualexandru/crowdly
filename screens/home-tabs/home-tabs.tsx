import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { RootStackParamList } from "../../App";
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
    <Tab.Navigator>
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
