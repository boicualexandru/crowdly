import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import ThemeColors from "../common/theme/theme-colors";
import ProfileScreen from "../screens/profile";
import ServicesScreen from "../screens/services/services";
import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "./root-stack";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import NewItemModal from "../components/new-item-modal/new-item-modal";

type HomeTabsParamList = {
  ServicesStack: undefined;
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
        initialRouteName="ServicesStack"
        tabBarOptions={{
          activeTintColor: ThemeColors.primary,
          showLabel: false,
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
          name="Add"
          component={NullComponent}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome5
                name="plus"
                color={color}
                size={size}
                solid={focused}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              setNewItemModalIsOpen(true);
              e.preventDefault();
            },
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
      <NewItemModal
        isOpen={newItemModalIsOpen}
        requestClose={() => setNewItemModalIsOpen(false)}
        onNewService={() => navigation.navigate("NewService", { userId: "ew" })}
      />
    </React.Fragment>
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
