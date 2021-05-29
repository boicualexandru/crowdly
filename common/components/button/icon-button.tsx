import { FontAwesome5, AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Pressable, GestureResponderEvent } from "react-native";

import ThemeColors from "@theme/theme-colors";

interface Props {
  icon: string;
  theme?: "FontAwesome5" | "AntDesign"
  solid?: boolean;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
}

const IconButton = (props: Props) => {
  const IconComponent = useMemo(() => {
    const theme = props.theme ?? "FontAwesome5";

    if(theme == "FontAwesome5") return FontAwesome5;
    if(theme == "AntDesign") return AntDesign;
  }, [props.theme]);

  return (
    <Pressable
      onPress={props.onPress}
      android_ripple={{ radius: 24, color: "#00000051" }}
      style={{ padding: 16, borderRadius: 200, backgroundColor: props.backgroundColor ?? 'transparent' }}
    >
      <IconComponent
        name={props.icon}
        solid={props.solid === true}
        color={props.color || ThemeColors.textDark}
        size={20}
      />
    </Pressable>
  );
};

export default IconButton;
