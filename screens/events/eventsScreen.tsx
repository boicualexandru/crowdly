import { useFocusEffect } from "@react-navigation/native";
import useEventsApi, {
  getInitialEventsFilters,
  Event,
  EventsFiltersModel,
} from "api/events";
import React, { useCallback, useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import {
  EventsStackNavigationPropChild,
  EventsStackRoutePropChild,
} from "@navigation/eventsStack";

import EventCard from "@screens/events/event-card";

import useInfiniteScroll from "@hooks/useInfiniteScroll";

import ThemeColors from "@theme/theme-colors";

import EventFilters from "./eventsFilters";
import { PreferencesContext } from "@context/preferences/preferencesContext";

type EventsScreenNavigationProp = EventsStackNavigationPropChild<"Events">;
type EventsScreenRouteProp = EventsStackRoutePropChild<"Events">;

interface Props {
  navigation: EventsScreenNavigationProp;
  route: EventsScreenRouteProp;
}

const EventsScreen = ({ navigation, route }: Props) => {
  const { getEventsPage } = useEventsApi();
  const { state: preferencesState } = useContext(PreferencesContext);
  const {
    data,
    hasMore,
    loadMore,
    isRefreshing,
    refresh,
    filters,
    applyFilters,
  } = useInfiniteScroll<Event, EventsFiltersModel>(
    getEventsPage,
    getInitialEventsFilters(preferencesState.currentCityId, route.params?.categoryType)
  );

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: route.params?.categoryName ?? "Evenimente",
      });
    }, [route.params])
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Event; index: number }) => (
      <EventCard
        event={item}
        onPress={() =>
          navigation.navigate("Event", { id: item.id, name: item.name })
        }
      ></EventCard>
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
      <EventFilters
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
        keyboardShouldPersistTaps="always"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EventsScreen;
