import { Feather } from "@expo/vector-icons";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

import ProfileScreen from "@screens/profileScreen";

import NewItemModal from "@components/new-item-modal/new-item-modal";

import ThemeColors from "@theme/theme-colors";

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "./rootStack";
import VendorsStackNavigation from "./vendorsStack";

type HomeTabsParamList = {
  VendorsStack: undefined;
  EventsStack: undefined;
  Add: undefined;
  Profile: undefined;
};

type HomeTabsNavigationProp = RootStackNavigationPropChild<"HomeTabs">;
type HomeTabsRouteProp = RootStackRoutePropChild<"HomeTabs">;

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabsNavigation = ({
  navigation,
}: {
  navigation: HomeTabsNavigationProp;
}) => {
  const [newItemModalIsOpen, setNewItemModalIsOpen] = useState(false);

  const NullComponent = () => {
    return null;
  };

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="VendorsStack"
        tabBarOptions={{
          activeTintColor: ThemeColors.primary,
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="VendorsStack"
          component={VendorsStackNavigation}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Feather
                name="briefcase"
                color={color}
                size={size}
                solid={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="EventsStack"
          component={VendorsStackNavigation}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Feather
                name="calendar"
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
              <Feather name="user" color={color} size={size} solid={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={NullComponent}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.plusButton}>
                <LinearGradient
                  colors={[ThemeColors.primary, "#FF0049"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <Feather
                  name="plus"
                  color={ThemeColors.white}
                  size={size}
                  solid={focused}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              setNewItemModalIsOpen(true);
              e.preventDefault();
            },
          }}
        />
      </Tab.Navigator>
      <NewItemModal
        isOpen={newItemModalIsOpen}
        requestClose={() => setNewItemModalIsOpen(false)}
        onNewVendor={() => navigation.navigate("EditVendor", {})}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    height: "140%",
    top: -20,
    position: "relative",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    overflow: "hidden",
  },
});

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
