import { VendorDetails } from "api/vendors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "@components/button/icon-button";

import { ThemeBoxing } from "@theme/theme-boxing";
import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

interface Props {
  vendor: VendorDetails;
}

const AboutTab = ({ vendor }: Props) => {
  return (
    <View style={ThemeBoxing.container}>
      <View>
        <Text
          style={[
            ThemeTypography.body1,
            ThemeTypographyColorStyles.text_dark_87,
          ]}
        >
          {vendor.description}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <IconButton
            icon="phone"
            color={ThemeColors.white}
            backgroundColor={ThemeColors.primary}
          />
        </View>
        <View style={styles.button}>
          <IconButton
            icon="envelope"
            color={ThemeColors.white}
            backgroundColor={ThemeColors.primary}
          />
        </View>
        <View style={styles.button}>
          <IconButton
            icon="map"
            color={ThemeColors.white}
            backgroundColor={ThemeColors.primary}
          />
        </View>
      </View>
    </View>
  );
};

export default AboutTab;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    marginHorizontal: 8
  }
});
