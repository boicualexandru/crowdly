import moment from "moment";
import { useState } from "react";
import { PeriodMarking } from "react-native-calendars";

import ThemeColors from "@theme/theme-colors";

interface Period {
  startDate: Date;
  endDate: Date;
}

interface CalendarState {
  unavailableDates: Date[];
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  markedDates: { [date: string]: PeriodMarking };
}

const useCalendar = (minDate?: Date, maxDate?: Date) => {
  console.log("useCalendar render");
  // const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  // const [selectedPeriod, setSelectedPeriod] = useState<{startDate?: Date, endDate?: Date}>({});
  // const [markedDates, setMarkedDates] = useState<{ [date: string]: PeriodMarking }>({});
  const [calendarState, setCalendarState] = useState<CalendarState>({
    unavailableDates: [],
    markedDates: {},
  });

  const setUnavailablePeriods = (periods: Period[]) => {
    const unavailableDates = getDatesFromPeriods(periods, minDate, maxDate);

    const newCalendarState: CalendarState = {
      ...calendarState,
      unavailableDates: unavailableDates,
      markedDates: getMarkedDates(
        unavailableDates,
        calendarState.selectedStartDate,
        calendarState.selectedEndDate
      ),
    };

    setCalendarState(newCalendarState);
  };

  const onDayPress = (date: Date) => {
    if (calendarState.selectedStartDate && !calendarState.selectedEndDate) {
      if (date.getTime() != calendarState.selectedStartDate.getTime())
        selectEndDay(date);
    } else selectStartDay(date);
  };

  const selectStartDay = (date: Date) => {
    if (
      isPeriodOverlappingWithUnavailableDates({
        startDate: date,
        endDate: date,
      })
    )
      return;

    const newCalendarState: CalendarState = {
      ...calendarState,
      selectedStartDate: date,
      selectedEndDate: undefined,
      markedDates: getMarkedDates(calendarState.unavailableDates, date),
    };

    setCalendarState(newCalendarState);
  };

  const selectEndDay = (date: Date) => {
    let newStartDate = calendarState.selectedStartDate as Date;
    let newEndDate = date;

    if (
      calendarState.selectedStartDate &&
      date < calendarState.selectedStartDate
    ) {
      // if selected day is before the start, then swap the start and end
      newStartDate = date;
      newEndDate = calendarState.selectedStartDate;
    }

    if (
      isPeriodOverlappingWithUnavailableDates({
        startDate: newStartDate,
        endDate: newEndDate,
      })
    )
      return;

    const newCalendarState: CalendarState = {
      ...calendarState,
      selectedStartDate: newStartDate,
      selectedEndDate: newEndDate,
      markedDates: getMarkedDates(
        calendarState.unavailableDates,
        newStartDate,
        newEndDate
      ),
    };

    setCalendarState(newCalendarState);
  };

  const isPeriodOverlappingWithUnavailableDates = (period: Period): boolean => {
    return calendarState.unavailableDates.some(
      (date) => date >= period.startDate && date <= period.endDate
    );
  };

  return {
    markedDates: calendarState.markedDates,
    setUnavailablePeriods,
    onDayPress,
  };
};

const getDatesFromPeriod = (period: Period): Date[] => {
  const dateArray: Date[] = [];
  var currentDate = new Date(period.startDate);
  while (currentDate <= period.endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
};

const getDatesFromPeriods = (
  periods: Period[],
  minDate?: Date,
  maxDate?: Date
): Date[] => {
  const filteredPeriods = periods.filter((p) => {
    if (maxDate && p.startDate > maxDate) return false;
    if (minDate && p.endDate < minDate) return false;
    return true;
  });

  const orderedPeriods = filteredPeriods.sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  const allDates = orderedPeriods.reduce(
    (dates, period) => [...dates, ...getDatesFromPeriod(period)],
    [] as Date[]
  );
  return allDates;
};

const selectedDayMarking: PeriodMarking = {
  selected: true,
  color: ThemeColors.primary,
};

const getMarkedDates = (
  unavailableDates: Date[],
  selectedStartDate?: Date,
  selectedEndDate?: Date
): { [date: string]: PeriodMarking } => {
  const markedDates: { [date: string]: PeriodMarking } = {};

  // mark unavailable dates
  unavailableDates.forEach((date) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    markedDates[dateString] = { disabled: true };
  });

  // mark selected dates
  if (selectedStartDate) {
    const selectedDates = getDatesFromPeriod({
      startDate: selectedStartDate,
      endDate: selectedEndDate ?? selectedStartDate,
    });
    const selectedDatesString = selectedDates.map((date) =>
      moment(date).format("YYYY-MM-DD")
    );

    selectedDatesString.forEach((date) => {
      markedDates[date] = { ...markedDates[date], ...selectedDayMarking };
    });

    const firstDateString = selectedDatesString[0];
    const lastDateString = selectedDatesString[selectedDatesString.length - 1];

    markedDates[firstDateString] = {
      ...markedDates[firstDateString],
      startingDay: true,
    };
    markedDates[lastDateString] = {
      ...markedDates[lastDateString],
      endingDay: true,
    };
  }

  return markedDates;
};

export default useCalendar;
