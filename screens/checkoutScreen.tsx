import { Period } from "api/schedulePeriods";
import React, { useCallback } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  VendorsStackNavigationPropChild,
  VendorsStackRoutePropChild,
} from "@navigation/vendorsStack";

import Button from "@components/button/button";

import { ThemeBoxing } from "@theme/theme-boxing";
import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";
import IconButton from "@components/button/icon-button";

interface CheckoutItems {
  vendorId: string;
  vendorName: string;
  vendorPrice: number;
  period: Period;
}

export interface CheckoutScreenProps {
  items: CheckoutItems[];
}

type CheckoutScreenNavigationProp = VendorsStackNavigationPropChild<"Checkout">;
type CheckoutScreenRouteProp = VendorsStackRoutePropChild<"Checkout">;

interface Props {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
}

const CheckoutScreen = ({ navigation, route }: Props) => {
  const checkoutParams = route.params;

  const renderItem = useCallback((item: CheckoutItems, onRemove: () => void) => {
    return (
      <View style={styles.item}>
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1524187208855-b6c2f1e78bce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
          }}
          style={styles.itemImage}
        />
        <View style={styles.itemText}>
          <View>
            <Text style={styles.itemCaption}>Locatie - 24 Mai - 28 Mai</Text>
            <Text style={styles.itemTitle}>Sun Garden</Text>
          </View>
          <Text style={styles.itemPrice}>2400 Lei</Text>
        </View>
        <View style={{position: 'absolute', top: -8, right: -8}}>
          <IconButton theme="Feather" icon="x-circle" size={30} color="red" onPress={onRemove} />
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={ThemeBoxing.container}
      >
        {renderItem(checkoutParams.items[0], () => {})}
        {renderItem(checkoutParams.items[0], () => {})}
      </ScrollView>
      <View style={styles.totalContainer}>
        <View>
          <Text style={styles.totalCaption}>TOTAL</Text>
          <Text style={styles.totalPrice}>2400 Lei</Text>
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text>
            <Button label="Termina" style={{}} />
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
    position: 'relative',
  },
  itemImage: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 16,
  },
  itemText: {
    flex: 1,
    marginLeft: 16,
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
  itemPrice: {
    ...ThemeTypography.h6,
    ...ThemeTypographyColorStyles.text_primary,
    textAlign: "right",
    marginTop: 4,
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
