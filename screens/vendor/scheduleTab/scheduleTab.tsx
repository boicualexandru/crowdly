import { useFocusEffect } from "@react-navigation/native";
import useSchdulePeriodsApi, { SchedulePeriod } from "api/schedulePeriods";
import { VendorDetails } from "api/vendors";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import Button from "@components/button/button";
import ScheduleItem from "./scheduleItem";

interface Props {
  vendor: VendorDetails;
}

const ScheduleTab = ({ vendor }: Props) => {
  const {
    getSchdulePeriodsByVendorId,
    createSchedulePeriodAsVendor,
    deleteSchedulePeriodAsVendor,
  } = useSchdulePeriodsApi();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<SchedulePeriod[]>([]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const refresh = useCallback(async () => {
    setIsRefreshing(true);

    const result = await getSchdulePeriodsByVendorId(vendor.id);
    setData(result);

    setIsRefreshing(false);
  }, [vendor.id]);

  const onDelete = useCallback(async (vendorId: string, periodId: string) => {
    await deleteSchedulePeriodAsVendor(vendorId, periodId);
    await refresh();
  }, []);

  const renderListHeader = useCallback(() => {
    return (
      <View style={styles.listHeader}>
        <Button label="Adauga" />
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: SchedulePeriod; index: number }) => (
      <ScheduleItem
        period={item}
        onDelete={async (periodId: string) =>
          await onDelete(item.vendorId, periodId)
        }
      />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        ListHeaderComponent={renderListHeader}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + Math.random().toString()}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default ScheduleTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    paddingBottom: 16,
  },
  listContent: {
    padding: 16,
  },
});
