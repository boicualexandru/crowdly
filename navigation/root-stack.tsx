import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NewServiceScreen from "../screens/services/new-service";
import HomeTabsNavigation from "./home-tabs";

export type RootStackParamList = {
  HomeTabs: undefined;
  NewService: { userId: string };
};

const Stack = createStackNavigator();

const RootStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabsNavigation} />
        <Stack.Screen name="NewService" component={NewServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
