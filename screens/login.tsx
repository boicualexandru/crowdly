import { RootStackNavigationPropChild, RootStackRoutePropChild } from "@navigation/root-stack";
import React from "react";
import { View, Text } from "react-native";

type LoginScreenNavigationProp = RootStackNavigationPropChild<"Login">;
type LoginScreenRouteProp = RootStackRoutePropChild<"Login">;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default LoginScreen;