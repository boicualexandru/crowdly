import useUserApi from "api/user";
import { useFormik } from "formik";
import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
import * as Yup from 'yup';

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/rootStack";

import Button from "@components/button/button";
import TextField from "@components/form/text-field";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";

import splashImage from "../assets/splash_text.png";
import Note from "@components/note/note";

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

const loginFormSchema = Yup.object({
  email: Yup.string()
    .email('Introdu un email valid')
    .required('Camp obligatoriu'),
  password: Yup.string()
    .required('Camp obligatoriu'),
});

const LoginScreen = ({ navigation, route }: Props) => {
  const { login } = useUserApi();

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setStatus();
      const errorMessage = await login({ ...values });
      
      if (!errorMessage) {
        navigation.replace("HomeTabs", { screen: "VendorsStack" });
        return;
      }

      formikHelpers.setStatus(errorMessage);
    },
    validateOnMount: false,
  });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="always"
    >
      <ImageBackground
        source={splashImage}
        style={styles.splashImage}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <View>
          <Text
            style={[
              ThemeTypography.h6,
              { fontWeight: "bold", marginBottom: 16 },
            ]}
          >
            Conecteaza-te
          </Text>
          <TextField
            label="Adresa de Email"
            onChangeText={formik.handleChange("email")}
            value={formik.values.email}
            containerStyle={styles.textField}
            autoCompleteType="email"
            textContentType="emailAddress"
            noteText={formik.errors["email"]}
            isError={!!formik.errors["email"]}
          />
          <TextField
            label="Parola"
            onChangeText={formik.handleChange("password")}
            value={formik.values.password}
            containerStyle={styles.textField}
            autoCompleteType="password"
            textContentType="password"
            secureTextEntry={true}
            noteText={formik.errors["password"]}
            isError={!!formik.errors["password"]}
          />
          {
            formik.status ?
            <Note text={formik.status} style={{marginTop: 8}} colorType="danger" /> : null
          }
        </View>
        <View>
          <Button
            onPress={() => formik.handleSubmit()}
            label="Conecteaza-te"
            style={{ marginTop: 16 }}
            loading={formik.isSubmitting}
            disabled={formik.touched && !formik.isValid}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  splashImage: {
    height: 250,
    width: "100%",
  },
  scrollViewContent: {
    justifyContent: "flex-start",
    width: "100%",
    position: "relative",
  },
  contentContainer: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "relative",
    top: -24,
    paddingVertical: 32,
    backgroundColor: ThemeColors.defaultBackgroundGray,
    height: "100%",
  },
  textField: {
    marginTop: 16,
  },
});

export default LoginScreen;
