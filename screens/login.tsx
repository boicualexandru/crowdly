import { login } from "api/auth";
import { AuthActionType } from "context/authActions";
import { AuthContext } from "context/authContext";
import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/root-stack";

type LoginScreenNavigationProp = RootStackNavigationPropChild<"Login">;
type LoginScreenRouteProp = RootStackRoutePropChild<"Login">;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen = ({ navigation, route }: Props) => {
  const { state, dispatch } = useContext(AuthContext);

  const onLogin = async () => {
    const loginResponse = await login({
      username: "USER01",
      password: "Testtest0!",
    });
    if (!loginResponse.success) return;

    console.log("State Before: ", state);
    dispatch({
      type: AuthActionType.Login,
      payload: {
        username: loginResponse.username,
        jwtToken: loginResponse.jwtToken,
      },
    });
  };
  return (
    <View>
      <Pressable onPress={async () => await onLogin()}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
