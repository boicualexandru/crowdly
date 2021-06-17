import { Picker } from "@react-native-picker/picker";
import { availableCities } from "api/vendors";
import { EventsFiltersModel } from "api/events";
import React, { memo, useState } from "react";
import { View, StyleSheet, ViewProps, Text } from "react-native";

import IconButton from "@components/button/icon-button";

import EventsFiltersModal from "./eventsFiltersModal";

interface Props extends ViewProps {
  filters: EventsFiltersModel;
  requestApply: (filters: EventsFiltersModel) => void;
}

const EventFilters = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View style={[styles.container, props.style]}>
      <View style={{ flex: 1 }}>
        <Picker
          selectedValue={props.filters.city}
          onValueChange={(itemValue, itemIndex) => {
            const city = itemValue.toString();
            if (city == props.filters.city) return;

            props.requestApply({
              ...props.filters,
              city: itemValue.toString(),
            });
          }}
          style={{ minWidth: 100, backgroundColor: "transparent" }}
        >
          {availableCities.map((city) => (
            <Picker.Item {...city} key={city.value} />
          ))}
        </Picker>
      </View>
      <IconButton icon="filter" onPress={() => setIsModalOpen(true)} />
      <EventsFiltersModal
        isOpen={isModalOpen}
        requestClose={() => setIsModalOpen(false)}
        requestApply={(f) => {
          props.requestApply(f);
          setIsModalOpen(false);
        }}
        filters={props.filters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default memo(EventFilters);
