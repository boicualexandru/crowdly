import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import useSchdulePeriodsApi, {
  CreateSchedulePeriodModel,
  VendorSchedulePeriod,
} from "api/schedulePeriods";
import { VendorDetails } from "api/vendors";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";

import Button from "@components/button/button";

import ThemeColors from "@theme/theme-colors";
import { ThemeTypographyColorStyles } from "@theme/theme-typography";

import { VendorScreenNavigationProp } from "../vendorScreen";
import AddSchedulePeriodModal from "./addSchedulePeriodModal";
import SchedulePeriodItem from "./schedulePeriodItem";
import SchedulePeriodItemModal from "./schedulePeriodItemModal";

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
  const [data, setData] = useState<VendorSchedulePeriod[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showPastItems, setShowPastItems] = useState(false);
  const [
    modalScheduleItem,
    setModalScheduleItem,
  ] = useState<VendorSchedulePeriod>();

  useFocusEffect(
    useCallback(() => {
      refresh(showPastItems);
    }, [showPastItems])
  );

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const refresh = useCallback(
    async (showPast: boolean) => {
      setIsRefreshing(true);

      const result = await getSchdulePeriodsByVendorId(vendor.id, showPast);
      setData(result);

      setIsRefreshing(false);
    },
    [vendor.id]
  );

  const onCreate = useCallback(
    async (vendorId: string, period: CreateSchedulePeriodModel) => {
      await createSchedulePeriodAsVendor(vendorId, period);
      setIsCreateModalOpen(false);
      await refresh(showPastItems);
    },
    [showPastItems]
  );

  const onDelete = useCallback(
    async (vendorId: string, periodId: string) => {
      await deleteSchedulePeriodAsVendor(vendorId, periodId);
      await refresh(showPastItems);
      setModalScheduleItem(undefined);
    },
    [showPastItems]
  );

  const renderListHeader = useCallback(() => {
    return (
      <View style={styles.listHeader}>
        <Button
          label="Adauga"
          onPress={() => setIsCreateModalOpen(true)}
          style={{ marginBottom: 16 }}
        />
        <View style={styles.headerChips}>
          <Pressable
            style={[
              styles.toggleChip,
              {
                borderColor: showPastItems
                  ? ThemeColors.primary
                  : ThemeColors.textDark,
              },
            ]}
            onPress={() => setShowPastItems((v) => !v)}
          >
            {showPastItems ? (
              <Feather
                name="check"
                color={ThemeColors.primary}
                size={18}
                style={{ marginRight: 8 }}
              />
            ) : null}
            <Text
              style={
                showPastItems
                  ? ThemeTypographyColorStyles.text_primary
                  : ThemeTypographyColorStyles.text_dark_60
              }
            >
              Afiseaza istoricul
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }, [showPastItems]);

  const renderItem = useCallback(
    ({ item, index }: { item: VendorSchedulePeriod; index: number }) => (
      <SchedulePeriodItem
        period={item}
        isPast={today > item.endDate}
        onModalShow={setModalScheduleItem}
      />
    ),
    [today]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refresh(showPastItems)}
          />
        }
        ListHeaderComponent={renderListHeader}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + Math.random().toString()}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="always"
      />
      <AddSchedulePeriodModal
        isOpen={isCreateModalOpen}
        schedulePeriods={data}
        requestClose={() => setIsCreateModalOpen(false)}
        requestCreate={async (period) => await onCreate(vendor.id, period)}
      />
      <SchedulePeriodItemModal
        schedulePeriod={modalScheduleItem}
        requestClose={() => setModalScheduleItem(undefined)}
        requestDelete={async (periodId: string) =>
          await onDelete(vendor.id, periodId)
        }
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
  headerChips: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  toggleChip: {
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});
