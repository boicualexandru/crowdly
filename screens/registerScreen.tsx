import useUserApi from "api/user";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { AuthContext } from "@context/auth/authContext";
import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/rootStack";

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
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

const RegisterScreen = ({ navigation, route }: Props) => {
  const { state, dispatch } = useContext(AuthContext);
  const { register } = useUserApi();

  const formik = useFormik<RegisterForm>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    },
    onSubmit: async (values) => {
      const registerResponse = await register({ ...values });
      if (!registerResponse) return;

      navigation.navigate("HomeTabs", { screen: "VendorsStack" });
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
          label="Prenume"
          onChangeText={formik.handleChange("firstName")}
          value={formik.values.firstName}
          containerStyle={styles.textField}
          textContentType="givenName"
        />
        <TextField
          label="Nume"
          onChangeText={formik.handleChange("lastName")}
          value={formik.values.lastName}
          containerStyle={styles.textField}
          textContentType="familyName"
        />
        <TextField
          label="Telefon"
          onChangeText={formik.handleChange("phoneNumber")}
          value={formik.values.phoneNumber}
          containerStyle={styles.textField}
          autoCompleteType="tel"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
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
          loading={formik.isSubmitting}
        />
        <Button
          onPress={() => navigation.replace("Login")}
          label="Conecteaza-te la un cont existent"
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

export default RegisterScreen;
