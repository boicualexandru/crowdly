import React from "react";
import { Pressable, GestureResponderEvent } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import ThemeColors from "../../common/theme/theme-colors";

interface Props {
  icon: string;
  solid?: boolean;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const IconButton = (props: Props) => {
  return (
    <Pressable
      onPress={props.onPress}
      android_ripple={{ radius: 24, color: "#00000051" }}
      style={{ padding: 16 }}
    >
      <FontAwesome5
        name={props.icon}
        solid={props.solid === true}
        color={props.color || ThemeColors.textDark}
        size={20}
      ></FontAwesome5>
    </Pressable>
  );
};

export default IconButton;
