import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect } from "@react-navigation/native";
import useVendorsApi, { VendorDetails } from "api/vendors";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Share } from "react-native";

import { PreferencesActionType } from "@context/preferences/preferencesActions";
import { PreferencesContext } from "@context/preferences/preferencesContext";
import {
  VendorsStackNavigationPropChild,
  VendorsStackRoutePropChild,
} from "@navigation/vendorsStack";

import IconButton from "@components/button/icon-button";
import ImageSwiper from "@components/image-swiper/image-swiper";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

import AboutTab from "./aboutTab";
import ScheduleTab from "./scheduleTab/scheduleTab";
import BookTab from "./bookTab/bookTab";
import { getCityById } from "api/helpers/cities";

export type VendorScreenNavigationProp = VendorsStackNavigationPropChild<"Vendor">;
type VendorScreenRouteProp = VendorsStackRoutePropChild<"Vendor">;

interface Props {
  navigation: VendorScreenNavigationProp;
  route: VendorScreenRouteProp;
}

const useVendorState = (
  navigation: VendorScreenNavigationProp
): [VendorDetails | undefined, (vendor: VendorDetails) => void] => {
  const [vendor, setVendorValue] = useState<VendorDetails>();
  const { state, dispatch } = useContext(PreferencesContext);
  
  const onShare = useCallback(async () => {
    await Share.share({
      message: `${vendor?.name} \nIntra acum in alpicatia Crowdly pentru a vizualiza mai multe detalii despre acest serviciu.`,
    });
  }, [vendor?.name]);

  const setVendor = (vendor: VendorDetails) => {
    navigation.setOptions({
      headerLeftContainerStyle: styles.headerButtonsWrapper,
      headerRightContainerStyle: styles.headerButtonsWrapper,
      headerRight: ({ tintColor }) => (
        <View style={{ flexDirection: "row" }}>
          {vendor.isEditable ? (
            <IconButton
              icon="edit-2"
              color={ThemeColors.textDark}
              theme="Feather"
              size={18}
              onPress={() =>
                navigation.navigate("EditVendor", { vendorId: vendor.id })
              }
            />
          ) : null}
          <IconButton
            icon="heart"
            solid={vendor.isFavourite}
            color={ThemeColors.primary}
            size={18}
            onPress={() =>
              dispatch({
                type: vendor.isFavourite
                  ? PreferencesActionType.RemoveVendorFromFavorites
                  : PreferencesActionType.AddVendorToFavorites,
                payload: {
                  vendorId: vendor.id,
                },
              })
            }
          />
          <IconButton 
            icon="share" 
            color={ThemeColors.textDark}
            theme="Feather"
            size={18}
            onPress={onShare}
          />
        </View>
      ),
    });

    return setVendorValue(vendor);
  };

  useEffect(() => {
    if (vendor)
      setVendor({
        ...vendor,
        isFavourite: state.favoriteVendors?.includes(vendor.id) ?? false,
      });
  }, [state.favoriteVendors, vendor?.name]);

  return [vendor, setVendor];
};

const VendorScreen = ({ navigation, route }: Props) => {
  const { id, name } = route.params;

  const [vendor, setVendor] = useVendorState(navigation);
  const { getVendorById } = useVendorsApi();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const vendorResponse = await getVendorById(id);
        setVendor(vendorResponse);
      })();
    }, [route.params])
  );

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
              {getCityById(vendor.cityId)?.name}
            </Text>
          </View>
          {/* <ReviewStars {...vendor.rating} style={Spacing.mt_4} /> */}
        </View>
        <VendorTabs vendor={vendor} navigation={navigation}></VendorTabs>
        {/* <LocationTabsContainer screenProps={vendor} style={{ flex: 1, width: '100%', alignSelf: 'stretch', backgroundColor: 'blue' }} /> */}
      </View>
    </View>
  );
};

type VendorTabsParamList = {
  About: VendorDetails;
  Schedule: VendorDetails;
  Book: VendorDetails;
};

const Tab = createMaterialTopTabNavigator<VendorTabsParamList>();

interface VendorTabsProps {
  vendor: VendorDetails;
  navigation: VendorScreenNavigationProp;
}

const VendorTabs = ({ vendor, navigation }: VendorTabsProps) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: ThemeColors.primary },
      }}
    >
      <Tab.Screen name="About" options={{ title: "Despre" }}>
        {() => <AboutTab vendor={vendor} navigation={navigation} />}
      </Tab.Screen>
      {
        vendor.isEditable ?
        <Tab.Screen name="Schedule" options={{ title: "Rezervari" }}>
          {() => <ScheduleTab vendor={vendor} navigation={navigation} />}
        </Tab.Screen> : null
      }
      <Tab.Screen name="Book" options={{ title: "Rezerva Acum" }}>
        {() => <BookTab vendor={vendor} navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
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
    backgroundColor: ThemeColors.white,
  },
  descriptionContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerButtonsWrapper: {
    backgroundColor: "#ffffffaa",
    elevation: 3,
    borderRadius: 200,
    height: 48,
    // width: 40,
    marginTop: 4,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default VendorScreen;
