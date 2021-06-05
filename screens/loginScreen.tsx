import useAuthApi from "api/auth";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { AuthActionType } from "@context/auth/authActions";
import { AuthContext } from "@context/auth/authContext";
import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/rootStack";

import Button from "@components/button/button";
import TextField from "@components/form/text-field";

import ThemeColors from "@theme/theme-colors";

type LoginScreenNavigationProp = RootStackNavigationPropChild<"Login">;
type LoginScreenRouteProp = RootStackRoutePropChild<"Login">;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

interface LoginForm {
  username: string;
  password: string;
}

const LoginScreen = ({ navigation, route }: Props) => {
  const { state, dispatch } = useContext(AuthContext);
  const { login, logout } = useAuthApi();

  const formik = useFormik<LoginForm>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const loginResponse = await login({ ...values });
      if (!loginResponse) return;

      dispatch({
        type: AuthActionType.Login,
        payload: {
          jwtToken: loginResponse.jwtToken,
        },
      });

      navigation.replace("HomeTabs", { screen: "VendorsStack" });
    },
  });

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
      }}
      contentContainerStyle={{
        justifyContent: "center",
        height: "100%",
      }}
      keyboardShouldPersistTaps="always"
    >
      <View>
        <TextField
          label="Nume de utilizator"
          onChangeText={formik.handleChange("username")}
          value={formik.values.username}
          containerStyle={styles.textField}
        />
        <TextField
          label="Parola"
          onChangeText={formik.handleChange("password")}
          value={formik.values.password}
          containerStyle={styles.textField}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View>
        <Button
          onPress={() => formik.handleSubmit()}
          label="Conecteaza-te"
          style={{ marginTop: 16 }}
        />
        <Button
          onPress={() => navigation.replace("Register")}
          label="Creeaza un cont nou"
          style={{ marginTop: 16, backgroundColor: "transparent", borderWidth: 0 }}
          labelStyle={{ color: ThemeColors.black }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    marginHorizontal: -8,
    flexDirection: "row",
  },
  textField: {
    marginTop: 16,
  },
});

export default LoginScreen;
