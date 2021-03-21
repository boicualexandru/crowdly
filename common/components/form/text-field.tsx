import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";

export interface TextFieldProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const TextField = (props: TextFieldProps) => {
  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      {
        props.label &&
        <Text style={[styles.inputLabel, props.labelStyle]}>
          {props.label}
        </Text>
      }
      <TextInput {...props} style={[styles.input, props.style, props.multiline && {height: -1, textAlignVertical: "top", paddingVertical: 8}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
  },
  inputLabel: {
    ...ThemeTypography.body2,
    marginBottom: 4,
    color: ThemeColors.textDark,
    fontWeight: "bold",
  },
  input: {
    ...ThemeTypography.body1,
    height: 40,
    borderColor: ThemeColors.gray,
    backgroundColor: ThemeColors.white,
    color: ThemeColors.textDark,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
});

export default TextField;
