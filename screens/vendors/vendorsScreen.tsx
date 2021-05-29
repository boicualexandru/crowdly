import useVendorsApi, {
  getInitialVendorsFilters,
  Vendor,
  VendorsFiltersModel,
} from "api/vendors";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import {
  VendorsStackNavigationPropChild,
  VendorsStackRoutePropChild,
} from "@navigation/vendorsStack";

import VendorCard from "@components/vendor-card/vendor-card";

import useInfiniteScroll from "@hooks/useInfiniteScroll";

import ThemeColors from "@theme/theme-colors";

import VendorFilters from "./vendorsFilters";

type VendorsScreenNavigationProp = VendorsStackNavigationPropChild<"Vendors">;
type VendorsScreenRouteProp = VendorsStackRoutePropChild<"Vendors">;

interface Props {
  navigation: VendorsScreenNavigationProp;
  route: VendorsScreenRouteProp;
}

const VendorsScreen = ({ navigation, route }: Props) => {
  const { getVendorsPage } = useVendorsApi();
  const {
    data,
    hasMore,
    loadMore,
    isRefreshing,
    refresh,
    filters,
    applyFilters,
  } = useInfiniteScroll<Vendor, VendorsFiltersModel>(
    getVendorsPage,
    getInitialVendorsFilters(route.params?.categoryType)
  );

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.categoryName ?? "Servicii",
    });
  }, [route.params]);

  const renderItem = useCallback(
    ({ item, index }: { item: Vendor; index: number }) => (
      <VendorCard
        vendor={item}
        onPress={() =>
          navigation.navigate("Vendor", { id: item.id, name: item.name })
        }
      ></VendorCard>
    ),
    []
  );

  const renderFooter = useCallback(() => {
    if (!hasMore) return null;

    return (
      <ActivityIndicator
        size="large"
        color={ThemeColors.primary}
        style={{ marginVertical: 16 }}
      />
    );
  }, [hasMore]);

  const renderHeader = useCallback(() => {
    return (
      <VendorFilters
        filters={filters}
        style={{ width: "100%", paddingHorizontal: 16 }}
        requestApply={applyFilters}
      />
    );
  }, [filters]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + Math.random().toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VendorsScreen;
