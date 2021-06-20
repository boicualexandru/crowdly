import React, { useMemo } from "react";
import { FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";

import ThemeColors from "@theme/theme-colors";

export interface ButtonProps extends PressableProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  leftIcon?: string;
  rightIcon?: string;
  iconTheme?: "FontAwesome5" | "AntDesign" | "Feather";
  outlined?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const buttonStyle = props.style as StyleProp<ViewStyle>;

  const IconComponent = useMemo(() => {
    const theme = props.iconTheme ?? "FontAwesome5";

    if (theme == "FontAwesome5") return FontAwesome5;
    if (theme == "AntDesign") return AntDesign;
    if (theme == "Feather") return Feather;
  }, [props.iconTheme]);

  const renderIcon = (icon: string, color: string, side: 'left' | 'right') => (
    <View style={[styles.iconContainer, {[side]: 0}]}>
      <IconComponent name={icon} size={14} color={color} style={styles.icon} />
    </View>
  )

  const color = props.disabled ? ThemeColors.textGray : ThemeColors.primary;

  return (
    <Pressable 
      {...props} 
      style={[
        styles.button, 
        {backgroundColor: color, borderColor: color}, 
        props.outlined ? {backgroundColor: 'transparent'}: null, 
        props.leftIcon ? {paddingLeft: 48}: null,
        props.rightIcon ? {paddingRight: 48}: null,
        buttonStyle]} 
      onPress={props.disabled || props.loading ? null : props.onPress}>
      {props.leftIcon && renderIcon(props.leftIcon, props.outlined ? color : ThemeColors.white, 'left')}
      {
        props.loading ?
        <ActivityIndicator
          size="small"
          color={props.outlined ? color : ThemeColors.white}
          style={{width: '100%'}}
        /> : null
      }
      <View>
        <Text style={[styles.label, props.outlined ? {color: color}: null, props.loading ? {opacity: 0} : null, props.labelStyle]}>{props.label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColors.primary,
    borderWidth: 2,
    borderColor: ThemeColors.primary,
    height: 40,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'relative'
  },
  label: {
    color: ThemeColors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    position: 'absolute',
    height: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {

  }
});

export default Button;
