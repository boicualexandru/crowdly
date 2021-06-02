import Button from '@components/button/button';
import Calendar from '@components/calendar/calendar';
import { SelectedPeriod } from '@components/calendar/useCalendar';
import { CheckoutActionType } from '@context/checkout/checkoutActions';
import { CheckoutContext } from '@context/checkout/checkoutContext';
import { useFocusEffect } from '@react-navigation/native';
import ThemeColors from '@theme/theme-colors';
import useSchdulePeriodsApi, { Period } from 'api/schedulePeriods';
import { VendorDetails } from 'api/vendors'
import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { VendorScreenNavigationProp } from '../vendorScreen';

interface Props {
  vendor: VendorDetails;
  navigation: VendorScreenNavigationProp;
}

const BookTab = ({ vendor, navigation }: Props) => {
  const {
    getUnavailablePeriodsByVendorId,
    bookSchedulePeriodAsUser
  } = useSchdulePeriodsApi();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [unavailablePeriods, setUnavailablePeriods] = useState<Period[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod>({});
  const { dispatch: checkoutDispatch } = useContext(CheckoutContext);
  
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const refresh = useCallback(async () => {
    setIsRefreshing(true);

    const result = await getUnavailablePeriodsByVendorId(vendor.id);
    setUnavailablePeriods(result);
    setSelectedPeriod({});

    setIsRefreshing(false);
  }, [vendor.id]);

  const onBook = useCallback(
    async () => {
      checkoutDispatch({
        type: CheckoutActionType.AddItemToCheckout,
        payload: {
          vendorId: vendor.id,
          vendorName: vendor.name,
          vendorPrice: vendor.price,
          vendorThumbnail: vendor.images[0],
          vendorCategory: vendor.category,
          period: {
            startDate: selectedPeriod.startDate as Date,
            endDate: selectedPeriod.endDate as Date,
          }
        }
      });

      // for the home tab navigator it takes time to get updated after the dispatch, so the checkout tab will not show up imidiately
      setTimeout(() => {
        navigation.navigate("CheckoutStack");
      }, 1000);
      // try {
      //   navigation.navigate("Checkout", {
      //     items: [{
      //       vendorId: vendor.id,
      //       period: {
      //         startDate: selectedPeriod.startDate as Date,
      //         endDate: selectedPeriod.endDate as Date,
      //       }
      //     }]
      //   })
      //   // await bookSchedulePeriodAsUser(vendor.id, {
      //   //   startDate: selectedPeriod.startDate as Date,
      //   //   endDate: selectedPeriod.endDate as Date,
      //   //   description: ''
      //   // });
      //   // alert('Rezervare adaugata cu success');
      // } catch {
      //   alert('A aparut o problema');
      // }
    },
    [vendor.id, selectedPeriod],
  )

  if (isRefreshing) 
    return (
      <ActivityIndicator
        size="large"
        color={ThemeColors.primary}
        style={{ marginVertical: 16 }}
      />
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Calendar
          unavailablePeriods={unavailablePeriods}
          onSelect={(period) =>
            setSelectedPeriod({
              startDate: period.startDate,
              endDate: period.endDate ?? period.startDate
            })
          }
        />
        <View style={{padding: 16}}>
          <Button 
            label="Selecteaza" 
            disabled={selectedPeriod.startDate == null || selectedPeriod.endDate == null}
            onPress={onBook} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BookTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
