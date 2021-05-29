import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  VendorsStackNavigationPropChild,
  VendorsStackRoutePropChild,
} from "@navigation/vendorsStack";

import IconButton from "@components/button/icon-button";
import ImageSwiper from "@components/image-swiper/image-swiper";

import { Vendor } from "@models/vendors/vendors";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

type VendorScreenNavigationProp = VendorsStackNavigationPropChild<"Vendor">;
type VendorScreenRouteProp = VendorsStackRoutePropChild<"Vendor">;

interface Props {
  navigation: VendorScreenNavigationProp;
  route: VendorScreenRouteProp;
}

const useVendorState = (
  navigation: VendorScreenNavigationProp
): [Vendor | undefined, (vendor: Vendor) => void] => {
  const [vendor, setVendorValue] = useState<Vendor>();

  const setVendor = (vendor: Vendor) => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="heart"
            solid={vendor?.isFavourite}
            color={ThemeColors.primary}
            onPress={() =>
              setVendor({ ...vendor, isFavourite: !vendor.isFavourite })
            }
          />
          <IconButton icon="share" />
        </View>
      ),
    });

    return setVendorValue(vendor);
  };

  return [vendor, setVendor];
};

const VendorScreen = ({ navigation, route }: Props) => {
  const { id, name } = route.params;

  const [vendor, setVendor] = useVendorState(navigation);

  useEffect(() => {
    setVendor({
      id: id,
      city: "Cluj-Napoca",
      email: "test@test.com",
      images: [
        "https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1067&q=80",
      ],
      name: name,
      tel: "1234",
      isFavourite: false,
    });
  }, [route.params]);

  if (vendor == null) return null;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          alignContent: "flex-start",
        }}
      >
        <ImageSwiper images={vendor.images} topGradient ratio={16.0 / 10} />

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionContent}>
            <Text
              style={[
                ThemeTypography.h5,
                ThemeTypographyColorStyles.text_dark_87,
              ]}
            >
              {vendor.name}
            </Text>
            <Text
              style={[
                ThemeTypography.caption,
                ThemeTypographyColorStyles.text_dark_60,
              ]}
            >
              {vendor.city}
            </Text>
          </View>
          {/* <ReviewStars {...vendor.rating} style={Spacing.mt_4} /> */}
        </View>
        {/* <LocationTabsContainer screenProps={vendor} style={{ flex: 1, width: '100%', alignSelf: 'stretch', backgroundColor: 'blue' }} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  descriptionContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default VendorScreen;
