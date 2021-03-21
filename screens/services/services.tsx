import { getServicesPage, ServiceDTO } from "api/services";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import {
  ServicesStackNavigationPropChild,
  ServicesStackRoutePropChild,
} from "@navigation/services-stack";

import ServiceCard from "@components/service-card/service-card";

import useInfiniteScroll from "@hooks/useInfiniteScroll";

import ThemeColors from "@theme/theme-colors";

type ServicesScreenNavigationProp = ServicesStackNavigationPropChild<"Services">;
type ServicesScreenRouteProp = ServicesStackRoutePropChild<"Services">;

interface Props {
  navigation: ServicesScreenNavigationProp;
  route: ServicesScreenRouteProp;
}

const ServicesScreen = ({ navigation }: Props) => {
  const { data, hasMore, loadMore, isRefreshing, refresh } = useInfiniteScroll(
    getServicesPage
  );

  const renderItem = useCallback(
    ({ item }: { item: ServiceDTO }) => (
      <ServiceCard
        service={item}
        onPress={() =>
          navigation.navigate("Service", { id: item.id, name: item.name })
        }
      ></ServiceCard>
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ServicesScreen;
