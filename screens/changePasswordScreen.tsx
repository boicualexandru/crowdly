import useAuthApi from "api/auth";
import { useFormik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  ProfileStackNavigationPropChild,
  ProfileStackRoutePropChild,
} from "@navigation/profileStack";

import Button from "@components/button/button";
import TextField from "@components/form/text-field";

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}

type ChangePasswordScreenNavigationProp = ProfileStackNavigationPropChild<"ChangePassword">;
type ChangePasswordScreenRouteProp = ProfileStackRoutePropChild<"ChangePassword">;

type Props = {
  navigation: ChangePasswordScreenNavigationProp;
  route: ChangePasswordScreenRouteProp;
};

const ChangePasswordScreen = ({ navigation, route }: Props) => {
  const { changePassword } = useAuthApi();

  const formik = useFormik<ChangePasswordForm>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      const response = await changePassword({
        ...values,
      });

      if (!response) return;

      navigation.pop();
    },
  });

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
      }}
      keyboardShouldPersistTaps="always"
    >
      <View>
        <TextField
          label="Parola Curenta"
          onChangeText={formik.handleChange("oldPassword")}
          value={formik.values.oldPassword}
          containerStyle={styles.textField}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
        />
        <TextField
          label="Parola Noua"
          onChangeText={formik.handleChange("newPassword")}
          value={formik.values.newPassword}
          containerStyle={styles.textField}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
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

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  textField: {
    marginTop: 16,
  },
});
