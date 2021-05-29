import { VendorDetails } from "api/vendors";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Linking,
  Pressable,
} from "react-native";

import IconButton from "@components/button/icon-button";
import MapImage from "@components/map-image/map-image";

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
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
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
              onPress={() => Linking.openURL(`tel:${vendor.tel}`)}
            />
          </View>
          <View style={styles.button}>
            <IconButton
              icon="envelope"
              color={ThemeColors.white}
              backgroundColor={ThemeColors.primary}
              onPress={() => Linking.openURL(`mailto:${vendor.email}`)}
            />
          </View>
          <View style={styles.button}>
            <IconButton
              icon="map"
              color={ThemeColors.white}
              backgroundColor={ThemeColors.primary}
              onPress={() =>
                Linking.openURL(
                  `http://www.google.com/maps/place/${vendor.lat},${vendor.lon}`
                )
              }
            />
          </View>
        </View>
      </View>
      {vendor.lon && vendor.lat ? (
        <Pressable
          onPress={() =>
            Linking.openURL(
              `http://www.google.com/maps/place/${vendor.lat},${vendor.lon}`
            )
          }
        >
          <MapImage lon={vendor.lon} lat={vendor.lat} aspectRatio={6 / 4} />
        </Pressable>
      ) : null}
    </ScrollView>
  );
};

export default AboutTab;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
    width: "100%",
  },
  button: {
    marginHorizontal: 8,
  },
});
