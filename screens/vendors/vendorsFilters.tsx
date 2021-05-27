import { Picker } from "@react-native-picker/picker";
import { availableCities, VendorsFiltersModel } from "api/vendors";
import React from "react";
import { View, StyleSheet, ViewProps, Text } from "react-native";

interface Props extends ViewProps {
  filters: VendorsFiltersModel;
  onApply: (filters: VendorsFiltersModel) => void;
}

const VendorFilters = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={{flex: 1}}>
        <Picker 
          selectedValue={props.filters.city}
          onValueChange={(itemValue, itemIndex) => {props.onApply({...props.filters, city: itemValue.toString()})}}
          style={{width: 200}}
        >
          {
            availableCities.map(city => (
              <Picker.Item label={city} value={city} key={city} />
            ))
          }
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default VendorFilters;