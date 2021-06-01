import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { PeriodMarking } from "react-native-calendars";

import ThemeColors from "@theme/theme-colors";

export interface Period {
  startDate: Date;
  endDate: Date;
}

export interface SelectedPeriod {
  startDate?: Date;
  endDate?: Date;
}

const selectedDayMarking: PeriodMarking = {
  selected: true,
  color: ThemeColors.primary,
};

interface Props {
  unavailablePeriods?: Period[];
  onSelect?: (period: SelectedPeriod) => void;
  minDate?: Date;
  maxDate?: Date;
}

const useCalendar = ({
  unavailablePeriods,
  onSelect,
  minDate,
  maxDate,
}: Props) => {
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod>({});
  const [markedDates, setMarkedDates] = useState<{
    [date: string]: PeriodMarking;
  }>({});

  useEffect(() => {
    const newMarkedDates: { [date: string]: PeriodMarking } = {};

    // mark unavailable dates
    unavailableDates.forEach((date) => {
      const dateString = moment(date).format("YYYY-MM-DD");
      newMarkedDates[dateString] = { disabled: true };
    });

    // mark selected dates
    if (selectedPeriod.startDate) {
      const selectedDates = getDatesFromPeriod({
        startDate: selectedPeriod.startDate,
        endDate: selectedPeriod.endDate ?? selectedPeriod.startDate,
      });
      const selectedDatesString = selectedDates.map((date) =>
        moment(date).format("YYYY-MM-DD")
      );

      selectedDatesString.forEach((date) => {
        newMarkedDates[date] = {
          ...newMarkedDates[date],
          ...selectedDayMarking,
        };
      });

      const firstDateString = selectedDatesString[0];
      const lastDateString =
        selectedDatesString[selectedDatesString.length - 1];

      newMarkedDates[firstDateString] = {
        ...newMarkedDates[firstDateString],
        startingDay: true,
      };
      newMarkedDates[lastDateString] = {
        ...newMarkedDates[lastDateString],
        endingDay: true,
      };
    }

    setMarkedDates(newMarkedDates);
  }, [unavailableDates, selectedPeriod]);

  useEffect(() => {
    onSelect && onSelect(selectedPeriod);
  }, [selectedPeriod]);

  useEffect(() => {
    const unavailableDates = unavailablePeriods
      ? getDatesFromPeriods(unavailablePeriods, minDate, maxDate)
      : [];
    setUnavailableDates(unavailableDates);
  }, [unavailablePeriods]);

  const isPeriodOverlappingWithUnavailableDates = useCallback(
    (period: Period): boolean => {
      return unavailableDates.some(
        (date) => date >= period.startDate && date <= period.endDate
      );
    },
    [unavailableDates]
  );

  const selectStartDay = useCallback(
    (date: Date) => {
      if (
        isPeriodOverlappingWithUnavailableDates({
          startDate: date,
          endDate: date,
        })
      )
        return;

      setSelectedPeriod({ startDate: date });
    },
    [isPeriodOverlappingWithUnavailableDates]
  );

  const selectEndDay = useCallback(
    (date: Date) => {
      let newStartDate = selectedPeriod.startDate as Date;
      let newEndDate = date;

      if (selectedPeriod.startDate && date < selectedPeriod.startDate) {
        // if selected day is before the start, then swap the start and end
        newStartDate = date;
        newEndDate = selectedPeriod.startDate;
      }

      if (
        isPeriodOverlappingWithUnavailableDates({
          startDate: newStartDate,
          endDate: newEndDate,
        })
      ) {
        const isDisabled =
          (minDate && date < minDate) ||
          (maxDate && date < maxDate) ||
          unavailableDates.some((ud) => ud.getTime() == date.getTime());
        if (!isDisabled) selectStartDay(date);
        return;
      }

      setSelectedPeriod({ startDate: newStartDate, endDate: newEndDate });
    },
    [isPeriodOverlappingWithUnavailableDates, selectedPeriod, selectStartDay]
  );

  const onDayPress = useCallback(
    (date: Date) => {
      console.log(date);

      const isOnlyStartSelected =
        selectedPeriod.startDate && !selectedPeriod.endDate;
      const isDateDifferentFromStart =
        !selectedPeriod.startDate ||
        date.getTime() != selectedPeriod.startDate.getTime();

      if (isOnlyStartSelected && isDateDifferentFromStart) selectEndDay(date);
      else selectStartDay(date);
    },
    [selectedPeriod, selectStartDay, selectEndDay]
  );

  const getDatesFromPeriod = useCallback((period: Period): Date[] => {
    const dateArray: Date[] = [];
    var currentDate = new Date(period.startDate);
    while (currentDate <= period.endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }, []);

  const getDatesFromPeriods = useCallback(
    (periods: Period[], minDate?: Date, maxDate?: Date): Date[] => {
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
    },
    []
  );

  return {
    markedDates: markedDates,
    onDayPress,
  };
};

export default useCalendar;
