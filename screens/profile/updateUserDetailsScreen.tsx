import { useFocusEffect } from "@react-navigation/native";
import useUserApi from "api/user";
import { useFormik } from "formik";
import React, { useCallback, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { AuthContext } from "@context/auth/authContext";
import {
  ProfileStackNavigationPropChild,
  ProfileStackRoutePropChild,
} from "@navigation/profileStack";

import Button from "@components/button/button";
import TextField from "@components/form/text-field";

interface UpdateUserDetailsForm {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

type UpdateUserDetailsScreenNavigationProp = ProfileStackNavigationPropChild<"UpdateUserDetails">;
type UpdateUserDetailsScreenRouteProp = ProfileStackRoutePropChild<"UpdateUserDetails">;

type Props = {
  navigation: UpdateUserDetailsScreenNavigationProp;
  route: UpdateUserDetailsScreenRouteProp;
};

const UpdateUserDetailsScreen = ({ navigation, route }: Props) => {
  const { updateUser } = useUserApi();
  const { state } = useContext(AuthContext);

  const formik = useFormik<UpdateUserDetailsForm>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    onSubmit: async (values) => {
      const response = await updateUser({
        ...values,
      });

      if (!response) return;

      navigation.pop();
    },
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        formik.setValues(
          {
            email: state.user?.email || "",
            firstName: state.user?.firstName || "",
            lastName: state.user?.lastName || "",
            phoneNumber: state.user?.phoneNumber || "",
          },
          false
        );
      })();
    }, [route.params, state.user])
  );

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
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
      </View>
      <View>
        <Button
          onPress={() => formik.handleSubmit()}
          label="Salveaza"
          style={{ marginVertical: 16 }}
        />
      </View>
    </ScrollView>
  );
};

export default UpdateUserDetailsScreen;

const styles = StyleSheet.create({
  textField: {
    marginTop: 16,
  },
});
