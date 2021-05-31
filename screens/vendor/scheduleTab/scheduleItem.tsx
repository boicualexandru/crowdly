import ThemeColors from '@theme/theme-colors';
import { ThemeTypography, ThemeTypographyColorStyles } from '@theme/theme-typography';
import { SchedulePeriod } from 'api/schedulePeriods';
import moment from 'moment';
import React, { useCallback } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
  period: SchedulePeriod;
  onDelete: (periodId: string) => void;
}

const ScheduleItem = ({ period, onDelete }: Props) => {
  const attepDelete = useCallback(
    (periodId: string) => {
      Alert.alert(
        "Stergi rezervarea?",
        "Aceasta rezervare va fi stearsa definitiv.",
        [
          {
            text: "Nu",
            style: "cancel",
          },
          {
            text: "Da, Sterge",
            onPress: () => onDelete(periodId),
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    },
    [onDelete]
  );

  const getFormattedDate = useCallback(
    (date: Date) => moment(date).format("Do MMMM"),
    []
  );

  return (
    <Pressable
      style={styles.scheduleItem}
      onPress={() => attepDelete(period.id)}
    >
      <View style={styles.intervalWrapper}>
        <Text style={styles.date}>{getFormattedDate(period.startDate)}</Text>
        <View style={styles.datesDivider} />
        <Text style={styles.date}>{getFormattedDate(period.endDate)}</Text>
      </View>
      <Text style={styles.description}>{period.description}</Text>
    </Pressable>
  );
};

export default ScheduleItem

const styles = StyleSheet.create({
  scheduleItem: {
    width: "100%",
    backgroundColor: ThemeColors.white,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  intervalWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    ...ThemeTypography.body1,
    ...ThemeTypographyColorStyles.text_dark_87,
    textTransform: "uppercase",
  },
  datesDivider: {
    borderBottomColor: ThemeColors.textGray,
    borderBottomWidth: 1,
    height: 0,
    width: 16,
  },
  description: {
    ...ThemeTypography.body2,
    ...ThemeTypographyColorStyles.text_dark_60,
    marginTop: 16,
  },
})
