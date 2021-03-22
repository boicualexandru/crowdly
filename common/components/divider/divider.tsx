import React from "react";
import {
  View,
  ViewProps,
  StyleSheet,
} from "react-native";

import ThemeColors from "@theme/theme-colors";

const Divider = (props: ViewProps) => {
  return <View {...props} style={[syles.divider, props.style]} />;
};

const syles = StyleSheet.create({
  divider: {
    height: 0,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: ThemeColors.gray,
  },
});

export default Divider;
