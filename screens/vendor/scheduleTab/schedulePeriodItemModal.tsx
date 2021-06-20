import { getImageUrlByUserId } from "api/helpers/getImage";
import { VendorSchedulePeriod } from "api/schedulePeriods";
import moment from "moment";
import React, { useCallback } from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";

import Button from "@components/button/button";
import IconButton from "@components/button/icon-button";
import Divider from "@components/divider/divider";
import BigModal from "@components/modal/big-modal";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

interface Props {
  schedulePeriod: VendorSchedulePeriod | undefined;
  requestClose: () => void;
  requestDelete: (periodId: string) => Promise<void>;
}

const SchedulePeriodItemModal = ({
  schedulePeriod,
  requestClose,
  requestDelete,
}: Props) => {
  const getFormattedDate = useCallback(
    (date: Date) => moment(date).format("Do MMM"),
    []
  );

  return (
    <BigModal isOpen={schedulePeriod != null} requestClose={requestClose}>
      <View style={{ width: "100%" }}>
        {schedulePeriod ? (
          <>
            <View style={styles.intervalWrapper}>
              <Text style={styles.date}>
                {getFormattedDate(schedulePeriod.startDate)}
              </Text>
              {schedulePeriod.startDate < schedulePeriod.endDate ? (
                <>
                  <View style={styles.datesDivider} />
                  <Text style={styles.date}>
                    {getFormattedDate(schedulePeriod.endDate)}
                  </Text>
                </>
              ) : null}
            </View>
            <View style={styles.userConatiner}>
              <Image
                source={
                  schedulePeriod.bookedByUser
                    ? {
                        uri: getImageUrlByUserId(
                          schedulePeriod.bookedByUser.id,
                          schedulePeriod.bookedByUser.image
                        ),
                      }
                    : {}
                }
                style={styles.userImage}
              />
              <Text style={styles.userName}>
                {schedulePeriod.bookedByUser
                  ? `${schedulePeriod.bookedByUser?.firstName} ${schedulePeriod.bookedByUser?.lastName}`
                  : "Adaugata manual"}
              </Text>
            </View>
            <Divider />
            {schedulePeriod.description ? (
              <View style={{ flexDirection: "column", marginVertical: 16 }}>
                <Text style={styles.descriptionLabel}>Descriere</Text>
                <Text style={styles.description}>
                  {schedulePeriod.description}
                </Text>
              </View>
            ) : null}
            {schedulePeriod.bookedByUser ? (
              <View style={styles.buttonsContainer}>
                {schedulePeriod.bookedByUser.phoneNumber ? (
                  <View style={styles.button}>
                    <IconButton
                      icon="phone"
                      color={ThemeColors.white}
                      backgroundColor={ThemeColors.primary}
                      onPress={() =>
                        Linking.openURL(
                          `tel:${schedulePeriod.bookedByUser.phoneNumber}`
                        )
                      }
                    />
                    <Text style={styles.buttonRightText}>
                      {schedulePeriod.bookedByUser.phoneNumber}
                    </Text>
                  </View>
                ) : null}
                {schedulePeriod.bookedByUser.email ? (
                  <View style={styles.button}>
                    <IconButton
                      icon="envelope"
                      color={ThemeColors.white}
                      backgroundColor={ThemeColors.primary}
                      onPress={() =>
                        Linking.openURL(
                          `mailto:${schedulePeriod.bookedByUser.email}`
                        )
                      }
                    />
                    <Text style={styles.buttonRightText}>
                      {schedulePeriod.bookedByUser.email}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}
            <View>
              <Button
                label="Sterge Rezervarea"
                onPress={() => requestDelete(schedulePeriod.id)}
              />
            </View>
          </>
        ) : null}
      </View>
    </BigModal>
  );
};

export default SchedulePeriodItemModal;

const styles = StyleSheet.create({
  intervalWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  date: {
    ...ThemeTypography.body1,
    ...ThemeTypographyColorStyles.text_dark_87,
    textTransform: "uppercase",
  },
  datesDivider: {
    borderBottomColor: ThemeColors.textGray,
    borderBottomWidth: 1,
    width: 8,
    height: 0,
    marginHorizontal: 8,
  },
  userConatiner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  descriptionLabel: {
    ...ThemeTypography.body2,
    ...ThemeTypographyColorStyles.text_dark_60,
    fontWeight: "bold",
  },
  description: {
    ...ThemeTypography.body2,
    ...ThemeTypographyColorStyles.text_dark_60,
  },
  buttonsContainer: {
    flexDirection: "column",
    marginVertical: 16,
    justifyContent: "flex-start",
    width: "100%",
  },
  button: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonRightText: {
    ...ThemeTypography.body1,
    ...ThemeTypographyColorStyles.text_dark_87,
    marginLeft: 16,
  },
});
