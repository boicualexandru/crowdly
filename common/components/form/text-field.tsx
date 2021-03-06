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
import Note from "@components/note/note";

export interface TextFieldProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  rightText?: string;
  noteText?: string;
  isError?: boolean;
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
      <View style={[styles.inputWrapper, props.multiline && {height: -1}, props.isError ? {borderColor: 'red'} : null]}>
        <TextInput {...props} style={[styles.input, props.style, props.multiline && {textAlignVertical: "top", paddingVertical: 8}]} />
        { props.rightText && <Text style={styles.sideText}>{props.rightText}</Text> }
      </View>
      {
        props.noteText ?
        <Note text={props.noteText} style={{marginTop: 4}} colorType={props.isError ? 'danger' : 'info'} /> : null
      }
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
  inputWrapper: {
    height: 40,
    borderColor: ThemeColors.gray,
    backgroundColor: ThemeColors.white,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  input: {
    ...ThemeTypography.body1,
    color: ThemeColors.textDark,
    flex: 1,
  },
  sideText: {
    ...ThemeTypography.body1,
    color: ThemeColors.textDark,
    fontWeight: "bold",
    textAlignVertical: "center"
  }
});

export default TextField;
