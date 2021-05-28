import { Picker } from "@react-native-picker/picker";
import { availableCities, VendorsFiltersModel } from "api/vendors";
import React, { useState } from "react";
import { View, StyleSheet, ViewProps, Text } from "react-native";

import IconButton from "@components/button/icon-button";

import VendorsFiltersModal from "./vendorsFiltersModal";

interface Props extends ViewProps {
  filters: VendorsFiltersModel;
  onApply: (filters: VendorsFiltersModel) => void;
}

const VendorFilters = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View style={[styles.container, props.style]}>
      <View style={{ flex: 1 }}>
        <Picker
          selectedValue={props.filters.city}
          onValueChange={(itemValue, itemIndex) => {
            props.onApply({ ...props.filters, city: itemValue.toString() });
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
      />
      {/* <Dropdown 
        selectedId={props.filters.cityId} options={Cities} 
        placeholderLabel="Toate Orașele"
        onSelect={(cityId: number) => {
          props.onApply({...props.filters, cityId: cityId});
        }}
        style={[Spacing.px_8, Spacing.py_8]} />
      <View style={styles.iconsWrapper}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          onPress={() => setSearchModalVisible(true)}>
          <Text style={[TypographyScaleStyles.caption, TypographyColorStyles.text_dark_60]}
            numberOfLines={1} ellipsizeMode="tail">{props.filters.searchText}</Text>
        </TouchableNativeFeedback>
        </View>
        <IconButton
          icon="search"
          onPress={() => setSearchModalVisible(true)}
          style={[Spacing.px_8, { height: 40 }]}
          iconStyle={[{ fontSize: 24 }, hasSearchTextApplied() ? TypographyColorStyles.text_primary: null]} />
        <IconButton
          icon="filter-list"
          onPress={() => setIsModalVisible(true)}
          style={[Spacing.px_8, { height: 40 }]}
          iconStyle={[{ fontSize: 24 }, hasFiltersApplied() ? TypographyColorStyles.text_primary: null]} />
      </View>

      <FiltersModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <LocationsFiltersForm
          filters={props.filters}
          onApply={(f: LocationFiltersModel) => {
            props.onApply({ ...f, cityId: props.filters.cityId });
            setIsModalVisible(false);
          }}
          onClose={() => setIsModalVisible(false)} />
      </FiltersModal>

      <SearchModal visible={searchModalVisible} 
        text={props.filters.searchText}
        onClose={() => setSearchModalVisible(false)}
        onApply={(text) => { 
          props.onApply({...props.filters, searchText: text});
          setSearchModalVisible(false); 
        }} /> */}
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

export default VendorFilters;
