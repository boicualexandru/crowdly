import { CreateSchedulePeriodModel, VendorSchedulePeriod } from "api/schedulePeriods";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "@components/button/button";
import Calendar from "@components/calendar/calendar";
import TextField from "@components/form/text-field";
import BigModal from "@components/modal/big-modal";

import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

interface Props {
  isOpen: boolean;
  schedulePeriods: VendorSchedulePeriod[];
  requestCreate: (period: CreateSchedulePeriodModel) => void;
  requestClose: () => void;
}

const schedulePeriodInitialState: Partial<CreateSchedulePeriodModel> = {
  description: "",
};

const AddSchedulePeriodModal = (props: Props) => {
  const [schedulePeriod, setSchedulePeriod] = useState<
    Partial<CreateSchedulePeriodModel>
  >(schedulePeriodInitialState);

  useEffect(() => {
    if (props.isOpen) {
      setSchedulePeriod(schedulePeriodInitialState);
    }
  }, [props.isOpen]);

  const isFormValid = useCallback(() => {
    return (
      schedulePeriod.description != "" &&
      schedulePeriod.startDate != null &&
      schedulePeriod.endDate != null
    );
  }, [schedulePeriod]);

  return (
    <BigModal isOpen={props.isOpen} requestClose={props.requestClose}>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Adauga o rezervare</Text>
        <TextField
          label="Descriere"
          onChangeText={(value) =>
            setSchedulePeriod((p) => ({ ...p, description: value }))
          }
          value={schedulePeriod.description}
          containerStyle={styles.fieldGroup}
        />
        <View>
          <Calendar
            unavailablePeriods={props.schedulePeriods.map((period) => ({
              startDate: period.startDate,
              endDate: period.endDate,
            }))}
            onSelect={(period) =>
              setSchedulePeriod((sp) => ({
                ...sp,
                startDate: period.startDate,
                endDate: period.endDate ?? period.startDate,
              }))
            }
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Button
            outlined
            label="Inchide"
            style={{ flex: 1, marginRight: 16 }}
            onPress={props.requestClose}
          />
          <Button
            label="Adauga"
            style={{ flex: 1 }}
            disabled={!isFormValid()}
            onPress={() =>
              props.requestCreate({
                description: schedulePeriod.description as string,
                startDate: schedulePeriod.startDate as Date,
                endDate: schedulePeriod.endDate as Date,
              })
            }
          />
        </View>
      </View>
    </BigModal>
  );
};

export default AddSchedulePeriodModal;

const styles = StyleSheet.create({
  title: {
    ...ThemeTypography.h6,
    ...ThemeTypographyColorStyles.text_dark_87,
    marginBottom: 16,
    fontWeight: "bold",
  },
  fieldGroup: {
    marginTop: 16,
  },
});
