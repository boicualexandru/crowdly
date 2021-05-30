import { Picker } from "@react-native-picker/picker";
import { availableCities, VendorsFiltersModel } from "api/vendors";
import React, { memo, useState } from "react";
import { View, StyleSheet, ViewProps, Text } from "react-native";

import IconButton from "@components/button/icon-button";

import VendorsFiltersModal from "./vendorsFiltersModal";

interface Props extends ViewProps {
  filters: VendorsFiltersModel;
  requestApply: (filters: VendorsFiltersModel) => void;
}

const VendorFilters = (props: Props) => {
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
      <VendorsFiltersModal
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

export default memo(VendorFilters);
