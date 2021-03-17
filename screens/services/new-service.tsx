import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../App";

type NewServiceScreenNavigationProp = StackScreenProps<RootStackParamList, 'NewService'>;

const NewServiceScreen = (props: NewServiceScreenNavigationProp) => {
  return (
    <View>
      <Text>NewService: {props.route.params.userId}</Text>
    </View>
  );
};

export default NewServiceScreen;
