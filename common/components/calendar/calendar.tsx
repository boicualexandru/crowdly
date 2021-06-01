import ThemeColors from "@theme/theme-colors";
import { Period } from "api/schedulePeriods";
import React from "react";
import { Calendar as RNCalendar } from "react-native-calendars";

import useCalendar, { SelectedPeriod } from "./useCalendar";

interface Props {
  unavailablePeriods: Period[];
  onSelect?: (period: SelectedPeriod) => void;
}

const Calendar = (props: Props) => {
  const { markedDates, onDayPress } = useCalendar({
    unavailablePeriods: props.unavailablePeriods,
    onSelect: props.onSelect,
  });

  return (
    <RNCalendar
      theme={{
        arrowColor: ThemeColors.primary,
      }}
      markingType="period"
      markedDates={markedDates}
      onDayPress={(day) => onDayPress(new Date(day.dateString))}
    />
  );
};

export default Calendar;
