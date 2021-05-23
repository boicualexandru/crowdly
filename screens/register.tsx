import useAuthApi from "api/auth";
import { AuthActionType } from "context/authActions";
import { AuthContext } from "context/authContext";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/root-stack";

import Button from "@components/button/button";
import TextField from "@components/form/text-field";

import ThemeColors from "@theme/theme-colors";

type RegisterScreenNavigationProp = RootStackNavigationPropChild<"Register">;
type RegisterScreenRouteProp = RootStackRoutePropChild<"Register">;

type Props = {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
};

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const RegisterScreen = ({ navigation, route }: Props) => {
  const { state, dispatch } = useContext(AuthContext);
  const { register, logout } = useAuthApi();

  const formik = useFormik<RegisterForm>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2));
      console.log("State Before Register: ", state);

      const registerResponse = await register({ ...values });
      if (!registerResponse.success) return;

      dispatch({
        type: AuthActionType.Login,
        payload: {
          username: registerResponse.username,
          jwtToken: registerResponse.jwtToken,
        },
      });
    },
  });

  const onLogout = async () => {
    console.log("State Before Logout: ", state);
    await logout();

    dispatch({
      type: AuthActionType.Logout,
    });
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
      }}
      contentContainerStyle={{
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View>
        <TextField
          label="Nume de utilizator"
          onChangeText={formik.handleChange("username")}
          value={formik.values.username}
          containerStyle={styles.textField}
        />
        <TextField
          label="Email"
          onChangeText={formik.handleChange("email")}
          value={formik.values.email}
          containerStyle={styles.textField}
          autoCompleteType="email"
          textContentType="emailAddress"
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
          label="Inregistreaza-te"
          style={{ marginTop: 16 }}
        />
        <Button
          onPress={() => navigation.replace("Login")}
          label="Conecteaza-te la un cont existent"
          style={{ marginTop: 16, backgroundColor: "transparent" }}
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

export default RegisterScreen;
