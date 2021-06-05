import useUserApi from "api/user";
import { useFormik } from "formik";
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

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
  email: string;
  password: string;
}

const LoginScreen = ({ navigation, route }: Props) => {
  const { login } = useUserApi();

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const loginResponse = await login({ ...values });
      if (!loginResponse) return;

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
          label="Adresa de Email"
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
          label="Conecteaza-te"
          style={{ marginTop: 16 }}
        />
        <Button
          onPress={() => navigation.replace("Register")}
          label="Creeaza un cont nou"
          style={{
            marginTop: 16,
            backgroundColor: "transparent",
            borderWidth: 0,
          }}
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
