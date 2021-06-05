import ThemeColors from "@theme/theme-colors";
import { Period } from "api/schedulePeriods";
import moment from "moment";
import React from "react";
import { Calendar as RNCalendar, LocaleConfig } from "react-native-calendars";

import useCalendar, { SelectedPeriod } from "./useCalendar";

const calendarLocaleConfig = locale => {
  const moment_locale = moment.localeData(locale);

  return {
    monthNames: moment_locale.months(),
    monthNamesShort: moment_locale.monthsShort(),
    dayNames: moment_locale.weekdays(),
    dayNamesShort: moment_locale.weekdaysShort(),
  };
};

const localeCode = "ro";
moment.locale(localeCode);
LocaleConfig.locales[localeCode] = calendarLocaleConfig(localeCode);
LocaleConfig.defaultLocale = localeCode;

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
        arrowColor: ThemeColors.textDark,
      }}
      firstDay={1}
      markingType="period"
      markedDates={markedDates}
      onDayPress={(day) => onDayPress(new Date(day.dateString))}
    />
  );
};

export default Calendar;
