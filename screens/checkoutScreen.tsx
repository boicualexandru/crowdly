import useCheckoutApi, { ConfirmCheckoutModel } from "api/checkout";
import { vendorCategoryNameDictionary } from "api/vendors";
import moment from "moment";
import React, { useCallback, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { CheckoutActionType } from "@context/checkout/checkoutActions";
import { CheckoutContext } from "@context/checkout/checkoutContext";
import { CheckoutItem } from "@context/checkout/checkoutState";
import {
  CheckoutStackNavigationPropChild,
  CheckoutStackRoutePropChild,
} from "@navigation/checkoutStack";

import Button from "@components/button/button";
import IconButton from "@components/button/icon-button";

import { ThemeBoxing } from "@theme/theme-boxing";
import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

type CheckoutScreenNavigationProp = CheckoutStackNavigationPropChild<"Checkout">;
type CheckoutScreenRouteProp = CheckoutStackRoutePropChild<"Checkout">;

interface Props {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
}

interface RenderItemProps {
  item: CheckoutItem;
  startMoment: moment.Moment;
  endMoment: moment.Moment;
  days: number;
}

const CheckoutScreen = ({ navigation, route }: Props) => {
  const { state: checkoutState, dispatch: checkoutDispatch } = useContext(
    CheckoutContext
  );
  const { confirmCheckout } = useCheckoutApi();

  const items: RenderItemProps[] = checkoutState.items.map((item) => {
    const startMoment = moment(item.period.startDate);
    const endMoment = moment(item.period.endDate);
    const days = moment.duration(endMoment.diff(startMoment)).asDays() + 1;

    return {
      item: item,
      startMoment: startMoment,
      endMoment: endMoment,
      days: days,
    };
  });

  const totalPrice = items.reduce(
    (totalSum, curr) => totalSum + curr.item.vendorPrice * curr.days,
    0
  );

  const onConfirmCheckout = useCallback(async () => {
    const checkoutModel: ConfirmCheckoutModel = {
      items: checkoutState.items.map((item) => ({
        vendorId: item.vendorId,
        startDate: item.period.startDate,
        endDate: item.period.endDate,
      })),
    };

    const schedulePeriods = await confirmCheckout(checkoutModel);
    checkoutDispatch({ type: CheckoutActionType.ClearCheckout });
  }, [checkoutState]);

  const renderItem = useCallback(
    (
      { item, startMoment, endMoment, days }: RenderItemProps,
      onRemove: () => void
    ) => {
      return (
        <View style={styles.item} key={item.vendorId + startMoment.toString()}>
          {item.vendorThumbnail ? (
            <Image
              source={{
                uri: item.vendorThumbnail,
              }}
              style={styles.itemImage}
            />
          ) : null}
          <View style={styles.itemText}>
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.itemCaption}>
                  {vendorCategoryNameDictionary[item.vendorCategory]}
                </Text>
                <Text style={styles.itemCaption}>
                  {startMoment.format("Do MMM")} - {days > 1 ? endMoment.format("Do MMM") : null}
                </Text>
              </View>
              <Text style={styles.itemTitle}>{item.vendorName}</Text>
            </View>
            <View style={styles.itemPriceContainer}>
              <Text style={styles.itemPrice}>
                {days > 1 ? `${days} x ` : null}
                {item.vendorPrice} Lei
              </Text>
              <IconButton
                theme="Feather"
                icon="trash-2"
                color={ThemeColors.primary}
                onPress={onRemove}
                style={{ padding: 0 }}
              />
            </View>
          </View>
        </View>
      );
    },
    []
  );

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={ThemeBoxing.container}
        keyboardShouldPersistTaps="always"
      >
        {items.map((item, index) =>
          renderItem(item, () =>
            checkoutDispatch({
              type: CheckoutActionType.RemoveItemFromCheckout,
              payload: {
                index: index,
              },
            })
          )
        )}
      </ScrollView>
      <View style={styles.totalContainer}>
        <View>
          <Text style={styles.totalCaption}>TOTAL</Text>
          <Text style={styles.totalPrice}>{totalPrice} Lei</Text>
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text>
            <Button label="Finalizeaza " onPress={onConfirmCheckout} />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "space-between",
    height: "100%",
  },
  item: {
    backgroundColor: ThemeColors.white,
    width: "100%",
    borderRadius: 20,
    padding: 16,
    elevation: 3,
    flexDirection: "row",
    marginBottom: 16,
    position: "relative",
  },
  itemImage: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 16,
    marginRight: 16,
  },
  itemText: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemCaption: {
    ...ThemeTypography.caption,
    ...ThemeTypographyColorStyles.text_dark_60,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  totalContainer: {
    ...ThemeBoxing.container,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  itemTitle: {
    ...ThemeTypography.h6,
    ...ThemeTypographyColorStyles.text_dark_87,
    marginTop: 4,
  },
  itemPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    ...ThemeTypography.h6,
    ...ThemeTypographyColorStyles.text_primary,
  },
  totalCaption: {
    ...ThemeTypography.caption,
    ...ThemeTypographyColorStyles.text_dark_60,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  totalPrice: {
    ...ThemeTypography.h5,
    ...ThemeTypographyColorStyles.text_primary,
    marginTop: 4,
    marginBottom: 8,
  },
});