import { getImageUrlByUserId } from "api/helpers/getImage";
import { VendorSchedulePeriod } from "api/schedulePeriods";
import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { Alert, Pressable, StyleSheet, Text, View, Image } from "react-native";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

interface Props {
  period: VendorSchedulePeriod;
  isPast?: boolean;
  onModalShow?: (period: VendorSchedulePeriod) => void;
}

const SchedulePeriodItem = ({ period, isPast, onModalShow }: Props) => {
  const getFormattedDate = useCallback(
    (date: Date) => moment(date).format("Do MMM"),
    []
  );

  return (
    <Pressable
      style={[styles.scheduleItem, isPast ? { opacity: 0.5 } : null]}
      onPress={() => onModalShow && onModalShow(period)}
    >
      <View
        style={{
          minWidth: 76,
          alignItems: "flex-start",
          borderRightWidth: 1,
          borderRightColor: ThemeColors.gray,
        }}
      >
        <View style={styles.intervalWrapper}>
          <Text style={styles.date}>{getFormattedDate(period.startDate)}</Text>
          {period.startDate < period.endDate ? (
            <>
              <View style={styles.datesDivider} />
              <Text style={styles.date}>
                {getFormattedDate(period.endDate)}
              </Text>
            </>
          ) : null}
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.userConatiner}>
          <Image
            source={
              period.bookedByUser
                ? {
                    uri: getImageUrlByUserId(
                      period.bookedByUser.id,
                      period.bookedByUser.image
                    ),
                  }
                : {}
            }
            style={styles.userImage}
          />
          <Text style={styles.userName}>
            {period.bookedByUser
              ? `${period.bookedByUser?.firstName} ${period.bookedByUser?.lastName}`
              : "Adaugata manual"}
          </Text>
        </View>
        {period.description ? (
          <View style={{ flexDirection: "column", marginTop: 8 }}>
            <Text style={styles.descriptionLabel}>Descriere</Text>
            <Text style={styles.description}>{period.description}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

export default SchedulePeriodItem;

const styles = StyleSheet.create({
  scheduleItem: {
    width: "100%",
    backgroundColor: ThemeColors.white,
    flexDirection: "row",
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  intervalWrapper: {
    flexDirection: "column",
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
    borderLeftWidth: 1,
    width: 0,
    height: 8,
    marginVertical: 8,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
  descriptionLabel: {
    ...ThemeTypography.body2,
    ...ThemeTypographyColorStyles.text_dark_60,
    fontWeight: "bold",
  },
  description: {
    ...ThemeTypography.body2,
    ...ThemeTypographyColorStyles.text_dark_60,
  },
  userConatiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    height: 22,
    width: 22,
    borderRadius: 40,
    marginRight: 8,
    backgroundColor: ThemeColors.gray,
  },
  userName: {
    ...ThemeTypography.body1,
    ...ThemeTypographyColorStyles.text_dark_60,
  },
});
