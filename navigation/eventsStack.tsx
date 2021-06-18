import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import EventScreen from "@screens/event/eventScreen";
import EventsScreen from "@screens/events/eventsScreen";

import {
  HomeTabsNavigationPropChild,
  HomeTabsRoutePropChild,
} from "./homeTabs";
import EventsCategoriesScreen from "@screens/eventsCategoriesScreen";
import { EventCategoryType } from "api/events";

type EventsStackParamList = {
  EventsCategories: undefined;
  Events: { categoryType: EventCategoryType, categoryName: string };
  Event: { id: string; name: string };
};

type EventsStackNavigationProp = HomeTabsNavigationPropChild<"EventsStack">;
type EventsStackRouteProp = HomeTabsRoutePropChild<"EventsStack">;

const Stack = createStackNavigator<EventsStackParamList>();

const EventsStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="EventsCategories">
      <Stack.Screen name="EventsCategories" component={EventsCategoriesScreen} options={{title: 'Evenimente'}} />
      <Stack.Screen name="Events" component={EventsScreen} options={{title: 'Evenimente'}} />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerTransparent: true,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default EventsStackNavigation;

export type EventsStackNavigationPropChild<
  RouteName extends keyof EventsStackParamList
> = CompositeNavigationProp<
  StackNavigationProp<EventsStackParamList, RouteName>,
  EventsStackNavigationProp
>;

export type EventsStackRoutePropChild<
  RouteName extends keyof EventsStackParamList
> = RouteProp<EventsStackParamList, RouteName>;
