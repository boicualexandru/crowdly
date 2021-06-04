import { Feather } from "@expo/vector-icons";
import {
  CardField,
  CardFieldInput,
  useStripe,
} from "@stripe/stripe-react-native";
import useCheckoutApi, { ConfirmCheckoutModel } from "api/checkout";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CheckoutActionType } from "@context/checkout/checkoutActions";
import { CheckoutContext } from "@context/checkout/checkoutContext";
import {
  CheckoutStackNavigationPropChild,
  CheckoutStackRoutePropChild,
} from "@navigation/checkoutStack";

import Button from "@components/button/button";
import BigModal from "@components/modal/big-modal";

import { ThemeBoxing } from "@theme/theme-boxing";
import ThemeColors from "@theme/theme-colors";
import { ThemeTypography } from "@theme/theme-typography";

type CheckoutScreenNavigationProp = CheckoutStackNavigationPropChild<"Payment">;
type CheckoutScreenRouteProp = CheckoutStackRoutePropChild<"Payment">;

interface Props {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
}

const PaymentScreen = ({ navigation, route }: Props) => {
  const { confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details>();
  const { state: checkoutState, dispatch: checkoutDispatch } = useContext(
    CheckoutContext
  );
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { confirmCheckout } = useCheckoutApi();

  const onConfirmPayment = useCallback(async () => {
    setLoading(true);
    const checkoutModel: ConfirmCheckoutModel = {
      items: checkoutState.items.map((item) => ({
        vendorId: item.vendorId,
        startDate: item.period.startDate,
        endDate: item.period.endDate,
      })),
    };

    const schedulePeriods = await confirmCheckout(checkoutModel);

    setLoading(false);
    setPaymentSucceeded(true);

    setTimeout(() => {
      checkoutDispatch({ type: CheckoutActionType.ClearCheckout });
      setPaymentSucceeded(false);
    }, 2000);
  }, [confirmPayment, cardDetails]);

  return (
    <View
      style={[
        ThemeBoxing.container,
        { height: "100%", justifyContent: "space-between" },
      ]}
    >
      <View style={{ width: "100%" }}>
        <Text style={[ThemeTypography.h6, { marginBottom: 16 }]}>
          Introdu detaliile cardului
        </Text>
        <View
          style={{
            backgroundColor: "#1d222e",
            paddingTop: 90,
            paddingBottom: 50,
            paddingHorizontal: 16,
            width: "100%",
            borderRadius: 14,
            elevation: 3,
          }}
        >
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#00000000",
              placeholderColor: "#888888",
              textColor: "#FFFFFF",
              borderColor: "#f79e1b",
              borderWidth: 1,
              borderRadius: 12,
            }}
            style={{
              width: "100%",
              height: 50,
            }}
            onCardChange={(cardDetails) => {
              console.log("cardDetails", cardDetails);
              setCardDetails(cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
          />
        </View>
      </View>
      <Button
        label="Finalizeaza "
        onPress={onConfirmPayment}
        loading={loading}
        disabled={!cardDetails?.complete}
        style={{ marginTop: 16, marginBottom: 24 }}
      />
      <BigModal isOpen={paymentSucceeded} requestClose={() => {}}>
        <View style={{ paddingVertical: 42, alignItems: "center" }}>
          <Feather name="check-circle" color={ThemeColors.success} size={86} />
          <Text
            style={[
              ThemeTypography.h6,
              { marginTop: 64, width: "100%", textAlign: "center" },
            ]}
          >
            Plata finalizata cu succes!
          </Text>
        </View>
      </BigModal>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
