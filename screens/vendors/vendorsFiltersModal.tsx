import {
  vendorCategoryOptions,
  VendorCategoryType,
  VendorsFiltersModel,
} from "api/vendors";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import Button from "@components/button/button";
import PickerField from "@components/form/picker-field";
import BigModal from "@components/modal/big-modal";

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
        <View>
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
      </View>
    </BigModal>
  );
};

export default VendorsFiltersModal;
