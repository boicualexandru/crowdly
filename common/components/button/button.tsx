import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";

import ThemeColors from "@theme/theme-colors";

export interface ButtonProps extends PressableProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  leftIcon?: string;
  rightIcon?: string;
}

const Button = (props: ButtonProps) => {
  const buttonStyle = props.style as StyleProp<ViewStyle>;

  const renderIcon = (icon: string) => (
    <FontAwesome5 name={icon} size={14} color={ThemeColors.white} style={styles.icon} />
  )

  return (
    <Pressable {...props} style={[styles.button, buttonStyle]}>
      {props.leftIcon && renderIcon(props.leftIcon)}
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColors.primary,
    height: 40,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16
  },
  label: {
    color: ThemeColors.white,
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  icon: {
  }
});

export default Button;
