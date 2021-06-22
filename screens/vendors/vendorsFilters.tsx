import { Picker } from "@react-native-picker/picker";
import { VendorsFiltersModel } from "api/vendors";
import React, { memo, useState } from "react";
import { View, StyleSheet, ViewProps, Text } from "react-native";

import IconButton from "@components/button/icon-button";

import VendorsFiltersModal from "./vendorsFiltersModal";
import { availableCities } from "api/helpers/cities";

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
          selectedValue={props.filters.cityId}
          onValueChange={(cityId, itemIndex) => {
            if (cityId == props.filters.cityId) return;

            props.requestApply({
              ...props.filters,
              cityId: cityId,
            });
          }}
          style={{ minWidth: 100, backgroundColor: "transparent" }}
        >
          <Picker.Item key={undefined} value={undefined} label="Toate orasele"  />
          {availableCities.map((city) => (
            <Picker.Item key={city.id} value={city.id} label={city.name}  />
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
