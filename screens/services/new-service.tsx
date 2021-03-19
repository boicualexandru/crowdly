import React from "react";
import { View, Text } from "react-native";
import {
  RootStackRoutePropChild,
  RootStackNavigationPropChild,
} from "../../navigation/root-stack";

type NewServiceScreenNavigationProp = RootStackNavigationPropChild<"NewService">;
type NewServiceScreenRouteProp = RootStackRoutePropChild<"NewService">;

type Props = {
  route: NewServiceScreenRouteProp;
};

const NewServiceScreen = ({ route }: Props) => {
  return (
    <View>
      <Text>NewService: {route.params.userId}</Text>
    </View>
  );
};

export default NewServiceScreen;