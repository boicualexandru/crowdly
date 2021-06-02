import {
  vendorCategoryOptions,
  VendorCategoryType,
  VendorsFiltersModel,
} from "api/vendors";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import Button from "@components/button/button";
import PickerField from "@components/form/picker-field";
import RangeTextField from "@components/form/range-text-field";
import BigModal from "@components/modal/big-modal";
import TextField from "@components/form/text-field";
import DateIntervalField from "@components/form/date-interval-field";

interface Props {
  isOpen: boolean;
  filters: VendorsFiltersModel;
  requestApply: (filters: VendorsFiltersModel) => void;
  requestClose: () => void;
}

const VendorsFiltersModal = (props: Props) => {
  const [tempFilters, setTempFilters] = useState<VendorsFiltersModel>(
    props.filters
  );

  useEffect(() => {
    if (props.isOpen) {
      setTempFilters(props.filters);
    }
  }, [props.isOpen]);

  return (
    <BigModal isOpen={props.isOpen} requestClose={props.requestClose}>
      <View style={{ width: "100%" }}>
        <PickerField
          label="Categoria"
          items={vendorCategoryOptions}
          selectedValue={tempFilters.category}
          onValueChange={(itemValue) => {
            setTempFilters((f) => ({
              ...f,
              category: itemValue as VendorCategoryType,
            }));
          }}
          containerStyle={styles.fieldGroup}
        />
        <RangeTextField
          label="In intervalul de pret"
          values={{ left: tempFilters.priceMin, right: tempFilters.priceMax }}
          onChanges={({ left, right }) => {
            setTempFilters((f) => ({
              ...f,
              priceMin: left,
              priceMax: right,
            }));
          }}
          containerStyle={styles.fieldGroup}
        />
        <TextField
          label="Numarul de invitati"
          onChangeText={(value) => {
            setTempFilters((f) => ({
              ...f,
              guests: value ? parseInt(value) : undefined,
            }));
          }}
          value={tempFilters.guests?.toString()}
          keyboardType={"numeric"}
          containerStyle={styles.fieldGroup}
        />
        <DateIntervalField
          label="Disponibil in perioada"
          values={{ left: tempFilters.periodStart, right: tempFilters.periodEnd }}
          onChanges={({ left, right }) => {
            setTempFilters((f) => ({
              ...f,
              periodStart: left,
              periodEnd: right,
            }));
          }}
          containerStyle={styles.fieldGroup}
        />
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Button
            outlined
            label="Inchide"
            style={{ flex: 1, marginRight: 16 }}
            onPress={props.requestClose}
          />
          <Button
            label="Aplica"
            style={{ flex: 1 }}
            onPress={() => props.requestApply(tempFilters)}
          />
        </View>
      </View>
    </BigModal>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    marginTop: 16,
  },
});

export default VendorsFiltersModal;
