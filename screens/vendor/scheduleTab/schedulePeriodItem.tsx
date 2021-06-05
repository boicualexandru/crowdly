import { getImageUrlByUserId } from "api/helpers/getImage";
import { VendorSchedulePeriod } from "api/schedulePeriods";
import moment from "moment";
import React, { useCallback } from "react";
import { Alert, Pressable, StyleSheet, Text, View, Image } from "react-native";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

interface Props {
  period: VendorSchedulePeriod;
  onDelete: (periodId: string) => void;
}

const SchedulePeriodItem = ({ period, onDelete }: Props) => {
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
      {period.bookedByUser != null ? (
        <View style={styles.userConatiner}>
          <Image
            source={{
              uri: getImageUrlByUserId(
                period.bookedByUser.id,
                period.bookedByUser.image
              ),
            }}
            style={styles.userImage}
          />
          <Text style={styles.userName}>
            {period.bookedByUser?.firstName} {period.bookedByUser?.lastName}
          </Text>
        </View>
      ) : null}
      {period.description != null && period.description != "" && (
        <Text style={styles.description}>{period.description}</Text>
      )}
    </Pressable>
  );
};

export default SchedulePeriodItem;

const styles = StyleSheet.create({
  scheduleItem: {
    width: "100%",
    backgroundColor: ThemeColors.white,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
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
  userConatiner: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: 40,
    marginRight: 8,
  },
  userName: {
    ...ThemeTypography.body2,
    ...ThemeTypographyColorStyles.text_dark_60,
  },
});
