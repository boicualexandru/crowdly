import {
  EventsFiltersModel,
} from "api/events";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import Button from "@components/button/button";
import RangeTextField from "@components/form/range-text-field";
import BigModal from "@components/modal/big-modal";
import TextField from "@components/form/text-field";
import DateIntervalField from "@components/form/date-interval-field";
import { ThemeTypography } from "@theme/theme-typography";
import DateField from "@components/form/date-field";

interface Props {
  isOpen: boolean;
  filters: EventsFiltersModel;
  requestApply: (filters: EventsFiltersModel) => void;
  requestClose: () => void;
}

const EventsFiltersModal = (props: Props) => {
  const [tempFilters, setTempFilters] = useState<EventsFiltersModel>(
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
        <Text style={[ThemeTypography.h6, {fontWeight: 'bold'}]}>Filtre Avansate</Text>
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
          placeholders={{
            left: 'Min',
            right: 'Max',
          }}
          containerStyle={styles.fieldGroup}
        />
        <DateField
          label="Dupa"
          onChange={(value) => {
            setTempFilters((f) => ({
              ...f,
              afterDateTime: value
            }));
          }}
          value={tempFilters.afterDateTime}
          placeholder="Data"
          containerStyle={styles.fieldGroup}
        />
        {/* <DateIntervalField
          label="Disponibil"
          values={{ left: tempFilters.periodStart, right: tempFilters.periodEnd }}
          onChanges={({ left, right }) => {
            setTempFilters((f) => ({
              ...f,
              periodStart: left,
              periodEnd: right,
            }));
          }}
          containerStyle={styles.fieldGroup}
        /> */}
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

export default EventsFiltersModal;
