import useUserApi from "api/user";
import { useFormik } from "formik";
import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import * as Yup from "yup";

import {
  RootStackNavigationPropChild,
  RootStackRoutePropChild,
} from "@navigation/rootStack";

import Button from "@components/button/button";
import TextField from "@components/form/text-field";
import Note from "@components/note/note";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";

import splashImage from "../assets/splash_text.png";

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

const registerFormSchema = Yup.object({
  email: Yup.string()
    .email("Introdu un email valid")
    .required("Camp obligatoriu"),
  firstName: Yup.string().required("Camp obligatoriu"),
  lastName: Yup.string().required("Camp obligatoriu"),
  phoneNumber: Yup.string().required("Camp obligatoriu"),
  password: Yup.string().required("Camp obligatoriu"),
});

const RegisterScreen = ({ navigation, route }: Props) => {
  const { register } = useUserApi();

  const formik = useFormik<RegisterForm>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setStatus();
      const errorMessage = await register({ ...values });

      if (!errorMessage) {
        navigation.navigate("HomeTabs", { screen: "VendorsStack" });
        return;
      }

      formikHelpers.setStatus(errorMessage);
    },
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
            Creeaza un Cont Nou
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
            label="Prenume"
            onChangeText={formik.handleChange("firstName")}
            value={formik.values.firstName}
            containerStyle={styles.textField}
            textContentType="givenName"
            noteText={formik.errors["firstName"]}
            isError={!!formik.errors["firstName"]}
          />
          <TextField
            label="Nume"
            onChangeText={formik.handleChange("lastName")}
            value={formik.values.lastName}
            containerStyle={styles.textField}
            textContentType="familyName"
            noteText={formik.errors["lastName"]}
            isError={!!formik.errors["lastName"]}
          />
          <TextField
            label="Telefon"
            onChangeText={formik.handleChange("phoneNumber")}
            value={formik.values.phoneNumber}
            containerStyle={styles.textField}
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            noteText={formik.errors["phoneNumber"]}
            isError={!!formik.errors["phoneNumber"]}
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
          {formik.status ? (
            <Note
              text={formik.status}
              style={{ marginTop: 8 }}
              colorType="danger"
            />
          ) : null}
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

export default RegisterScreen;
