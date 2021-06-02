import Button from '@components/button/button';
import Calendar from '@components/calendar/calendar';
import { SelectedPeriod } from '@components/calendar/useCalendar';
import { useFocusEffect } from '@react-navigation/native';
import ThemeColors from '@theme/theme-colors';
import useSchdulePeriodsApi, { Period } from 'api/schedulePeriods';
import { VendorDetails } from 'api/vendors'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  vendor: VendorDetails;
}

const BookTab = ({ vendor }: Props) => {
  const {
    getUnavailablePeriodsByVendorId,
    bookSchedulePeriodAsUser
  } = useSchdulePeriodsApi();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [unavailablePeriods, setUnavailablePeriods] = useState<Period[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod>({});
  
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
      try {
        await bookSchedulePeriodAsUser(vendor.id, {
          startDate: selectedPeriod.startDate as Date,
          endDate: selectedPeriod.endDate as Date,
          description: ''
        });
        alert('Rezervare adaugata cu success');
      } catch {
        alert('A aparut o problema');
      }
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
            label="Rezerva" 
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
