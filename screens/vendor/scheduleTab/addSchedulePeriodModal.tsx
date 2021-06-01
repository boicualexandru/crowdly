import { CreateSchedulePeriodModel, SchedulePeriod } from "api/schedulePeriods";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Calendar,
} from "react-native-calendars";

import Button from "@components/button/button";
import TextField from "@components/form/text-field";
import BigModal from "@components/modal/big-modal";

import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";
import useCalendar from "./useCalendar";

interface Props {
  isOpen: boolean;
  schedulePeriods: SchedulePeriod[];
  requestCreate: (period: CreateSchedulePeriodModel) => void;
  requestClose: () => void;
}

const schedulePeriodInitialState: CreateSchedulePeriodModel = {
  description: "",
  startDate: new Date(),
  endDate: new Date(),
};

const AddSchedulePeriodModal = (props: Props) => {
  const [period, setPeriod] = useState<CreateSchedulePeriodModel>(
    schedulePeriodInitialState
  );
  const [date, setDate] = useState(new Date());

  const { markedDates, setUnavailablePeriods, onDayPress } = useCalendar();

  useEffect(() => {
    const unavailablePeriods = props.schedulePeriods.map((period) => ({
      startDate: moment(period.startDate).toDate(),
      endDate: moment(period.endDate).toDate(),
    }));
    setUnavailablePeriods(unavailablePeriods);
  }, [props.schedulePeriods]);

  useEffect(() => {
    if (props.isOpen) {
      setPeriod(schedulePeriodInitialState);
    }
  }, [props.isOpen]);

  return (
    <BigModal isOpen={props.isOpen} requestClose={props.requestClose}>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Adauga o rezervare</Text>
        <TextField
          label="Descriere"
          onChangeText={(value) =>
            setPeriod((p) => ({ ...p, description: value }))
          }
          value={period.description}
          containerStyle={styles.fieldGroup}
        />
        <View>
          <Text>Filter</Text>
          <Calendar
            markingType="period"
            markedDates={markedDates}
            onDayPress={(day) => onDayPress(moment(day.dateString).toDate())}
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
            onPress={() => props.requestCreate(period)}
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
