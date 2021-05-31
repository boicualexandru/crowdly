import { useFocusEffect } from "@react-navigation/native";
import useSchdulePeriodsApi, { SchedulePeriod } from "api/schedulePeriods";
import { VendorDetails } from "api/vendors";
import moment from "moment";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "@components/button/button";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

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

  const renderListHeader = useCallback(() => {
    return (
      <View style={styles.listHeader}>
        <Button label="Adauga" />
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: SchedulePeriod; index: number }) => (
      <ScheduleItem period={item} />
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

interface ScheduleItemProps {
  period: SchedulePeriod;
}

const ScheduleItem = ({ period }: ScheduleItemProps) => {
  return (
    <View style={styles.scheduleItem}>
      <View style={styles.intervalWrapper}>
        <Text style={styles.date}>
          {moment(period.startDate).format("Do MMMM")}
        </Text>
        <View style={styles.datesDivider} />
        <Text style={styles.date}>
          {moment(period.endDate).format("Do MMMM")}
        </Text>
      </View>
      <Text style={styles.description}>{period.description}</Text>
    </View>
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
  scheduleItem: {
    width: "100%",
    backgroundColor: ThemeColors.white,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  intervalWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    ...ThemeTypography.body1,
    ...ThemeTypographyColorStyles.text_dark_87,
    fontSize: 20,
    textTransform: "uppercase",
  },
  datesDivider: {
    borderBottomColor: ThemeColors.textGray,
    borderBottomWidth: 1,
    height: 0,
    width: 16,
  },
  description: {
    ...ThemeTypography.body2,
    ...ThemeTypographyColorStyles.text_dark_60,
    marginTop: 16,
  },
});
