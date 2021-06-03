import React, { useCallback, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CardField, CardFieldInput, useStripe } from '@stripe/stripe-react-native';
import { CheckoutStackNavigationPropChild, CheckoutStackRoutePropChild } from '@navigation/checkoutStack';
import { ThemeBoxing } from '@theme/theme-boxing';
import Button from '@components/button/button';
import { CheckoutContext } from '@context/checkout/checkoutContext';
import useCheckoutApi, { ConfirmCheckoutModel } from 'api/checkout';
import { ThemeTypography } from '@theme/theme-typography';
import { CheckoutActionType } from '@context/checkout/checkoutActions';

type CheckoutScreenNavigationProp = CheckoutStackNavigationPropChild<"Payment">;
type CheckoutScreenRouteProp = CheckoutStackRoutePropChild<"Payment">;

interface Props {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
}

const PaymentScreen = ({ navigation, route }: Props) => {
  const { confirmPayment } = useStripe();
  const [ cardDetails, setCardDetails ] = useState<CardFieldInput.Details>();
  const { state: checkoutState, dispatch: checkoutDispatch } = useContext(
    CheckoutContext
  );
  const { confirmCheckout } = useCheckoutApi();

  const onConfirmPayment = useCallback(async () => {
    const checkoutModel: ConfirmCheckoutModel = {
      items: checkoutState.items.map((item) => ({
        vendorId: item.vendorId,
        startDate: item.period.startDate,
        endDate: item.period.endDate,
      })),
    };

    const schedulePeriods = await confirmCheckout(checkoutModel);
    checkoutDispatch({ type: CheckoutActionType.ClearCheckout });
  }, [confirmPayment, cardDetails]);

  return (
    <View style={[ThemeBoxing.container, {height: '100%', justifyContent: 'space-between'}]}>
      <View style={{width: '100%'}}>
        <Text style={[ThemeTypography.h6, {marginBottom: 16}]}>Introdu detaliile cardului</Text>
        <View style={{
          backgroundColor: "#1d222e",
          paddingTop: 90,
          paddingBottom: 50,
          paddingHorizontal: 16,
          width: '100%',
          borderRadius: 14,
          elevation: 3,
        }}>
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#00000000',
              placeholderColor: '#888888',
              textColor: '#FFFFFF',
              borderColor: '#f79e1b',
              borderWidth: 1,
              borderRadius: 12,
            }}
            style={{
              width: '100%',
              height: 50,
            }}
            onCardChange={(cardDetails) => {
              console.log('cardDetails', cardDetails);
              setCardDetails(cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log('focusField', focusedField);
            }}
          />
        </View>
      </View>
      <Button label="Finalizeaza " onPress={onConfirmPayment} disabled={!cardDetails?.complete} style={{marginTop: 16, marginBottom: 24}} />
    </View>
  );
}

export default PaymentScreen

const styles = StyleSheet.create({})
