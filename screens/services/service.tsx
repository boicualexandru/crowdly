import React from "react";
import { View, Text } from "react-native";
import {
  ServicesStackNavigationPropChild,
  ServicesStackRoutePropChild,
} from "../../navigation/services-stack";

type ServiceScreenNavigationProp = ServicesStackNavigationPropChild<"Service">;
type ServiceScreenRouteProp = ServicesStackRoutePropChild<"Service">;

const ServiceScreen = () => {
  return (
    <View>
      <Text>Service</Text>
    </View>
  );
};

export default ServiceScreen;
