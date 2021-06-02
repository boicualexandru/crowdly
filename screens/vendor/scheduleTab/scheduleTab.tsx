import { useFocusEffect } from "@react-navigation/native";
import useSchdulePeriodsApi, {
  CreateSchedulePeriodModel,
  SchedulePeriod,
} from "api/schedulePeriods";
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

import AddSchedulePeriodModal from "./addSchedulePeriodModal";
import SchedulePeriodItem from "./schedulePeriodItem";
import { VendorScreenNavigationProp } from "../vendorScreen";

interface Props {
  vendor: VendorDetails;
  navigation: VendorScreenNavigationProp;
}

const ScheduleTab = ({ vendor }: Props) => {
  const {
    getSchdulePeriodsByVendorId,
    createSchedulePeriodAsVendor,
    deleteSchedulePeriodAsVendor,
  } = useSchdulePeriodsApi();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<SchedulePeriod[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const onCreate = useCallback(
    async (vendorId: string, period: CreateSchedulePeriodModel) => {
      await createSchedulePeriodAsVendor(vendorId, period);
      setIsCreateModalOpen(false);
      await refresh();
    },
    []
  );

  const onDelete = useCallback(async (vendorId: string, periodId: string) => {
    await deleteSchedulePeriodAsVendor(vendorId, periodId);
    await refresh();
  }, []);

  const renderListHeader = useCallback(() => {
    return (
      <View style={styles.listHeader}>
        <Button label="Adauga" onPress={() => setIsCreateModalOpen(true)} />
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: SchedulePeriod; index: number }) => (
      <SchedulePeriodItem
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
      <AddSchedulePeriodModal
        isOpen={isCreateModalOpen}
        schedulePeriods={data}
        requestClose={() => setIsCreateModalOpen(false)}
        requestCreate={async (period) => await onCreate(vendor.id, period)}
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
