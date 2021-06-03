import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Pressable, GestureResponderEvent, ViewStyle, StyleProp } from "react-native";

import ThemeColors from "@theme/theme-colors";

interface Props {
  icon: string;
  theme?: "FontAwesome5" | "AntDesign" | "Feather";
  solid?: boolean;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  size?: number;
  style?: StyleProp<ViewStyle>
}

const IconButton = (props: Props) => {
  const IconComponent = useMemo(() => {
    const theme = props.theme ?? "FontAwesome5";

    if (theme == "FontAwesome5") return FontAwesome5;
    if (theme == "AntDesign") return AntDesign;
    if (theme == "Feather") return Feather;
  }, [props.theme]);

  return (
    <Pressable
      onPress={props.onPress}
      android_ripple={{ radius: 24, color: "#00000051" }}
      style={[{
        padding: 16,
        borderRadius: 200,
        backgroundColor: props.backgroundColor ?? "transparent",
      }, props.style]}
    >
      <IconComponent
        name={props.icon}
        solid={props.solid === true}
        color={props.color || ThemeColors.textDark}
        size={props.size ?? 20}
      />
    </Pressable>
  );
};

export default IconButton;
