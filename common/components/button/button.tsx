import React from "react";
import { Button as RNUIButton } from "react-native-ui-lib";

import ThemeColors from "@theme/theme-colors";

export interface ButtonProps {
  label: string;
  color?: "primary";
}

const Button = (props: ButtonProps) => {
  return (
    <RNUIButton
      label={props.label}
      borderRadius={7}
      backgroundColor={ThemeColors.primary}
      style={{ height: 45 }}
    />
  );
};

export default Button;
