import React from "react";
import { Calendar as RNCalendar } from "react-native-calendars";

import useCalendar, { Period, SelectedPeriod } from "./useCalendar";

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
      markingType="period"
      markedDates={markedDates}
      onDayPress={(day) => onDayPress(new Date(day.dateString))}
    />
  );
};

export default Calendar;
