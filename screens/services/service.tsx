import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { HomeTabsNavigationProp } from "../../navigation/home-tabs";
import { ServicesStackParamList } from "../../navigation/services-stack";

type ServiceScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ServicesStackParamList, "Service">,
  HomeTabsNavigationProp
>;

const ServiceScreen = (props: ServiceScreenNavigationProp) => {
  return (
    <View>
      <Text>Service</Text>
    </View>
  );
};

export default ServiceScreen;
