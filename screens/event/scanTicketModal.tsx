import {
  EventsFiltersModel,
} from "api/events";
import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Image } from "react-native";

import Button from "@components/button/button";
import RangeTextField from "@components/form/range-text-field";
import BigModal from "@components/modal/big-modal";
import TextField from "@components/form/text-field";
import DateIntervalField from "@components/form/date-interval-field";
import { ThemeTypography, ThemeTypographyColorStyles } from "@theme/theme-typography";
import DateField from "@components/form/date-field";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import ThemeColors from "@theme/theme-colors";
import { TicketValidationResult, useTicketsApi, ValidTicketResult } from "api/tickets";
import { getImageUrlByUserId } from "api/helpers/getImage";

interface Props {
  isOpen: boolean;
  eventId: string;
  // requestApply: (data: string) => void;
  requestClose: () => void;
}

const ScanTicketModal = (props: Props) => {
  const { validateTicket } = useTicketsApi();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<TicketValidationResult | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      setScanned(false);
      setIsValidating(false);
      setValidationResult(null);
    })();
  }, [props.isOpen]);

  
  const getUserNameToDisplay = useCallback((ticket: ValidTicketResult) => {
    if (ticket.firstName && ticket.lastName)
      return `${ticket.firstName} ${ticket.lastName}`;
    return ticket.firstName || ticket.email || "Utilizator";
  }, []);

  const handleBarCodeScanned = async ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    setIsValidating(true);

    const validationResult = await validateTicket(data);
    setIsValidating(false);
    setValidationResult(validationResult);
  };

  const renderScanner = () => {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{flex: 1}}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject]}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
      </View>
    )
  }

  const renderinvalidTicket = () => (
    <View style={{ paddingVertical: 42, alignItems: "center" }}>
      <Feather name="slash" color={ThemeColors.danger} size={86} />
      <Text
        style={[
          ThemeTypography.h6,
          { marginTop: 64, width: "100%", textAlign: "center" },
        ]}
      >
        Bilet invalid
      </Text>
    </View>
  )

  const renderTicket = (ticket: ValidTicketResult) => (
    <View style={styles.profileDetailContainer}>
      <View style={styles.profileImageCircle}>
        {
          ticket.profileImage ?
          <Image
            source={{ uri: getImageUrlByUserId(ticket.userId, ticket.profileImage) }}
            style={styles.profileImage}
          /> :
          <Feather name="user" color={ThemeColors.primary} size={46} />
        }
      </View>
      <Text style={styles.profileName}>{getUserNameToDisplay(ticket)}</Text>
    </View>
  )

  const renderScanResult = () => {
    if (isValidating) return (
      <ActivityIndicator
        size="large"
        color={ThemeColors.primary}
        style={{ marginVertical: 16 }}
      />
    )

    return (
      <View>
        {
          validationResult?.isValid ?
          renderTicket(validationResult as ValidTicketResult):
          renderinvalidTicket()
        }
        <Button 
          label={'Scaneaza alt bilet'} 
          onPress={() => setScanned(false)} 
          leftIcon="qrcode"
          iconTheme="FontAwesome5"
        />
      </View>
    )
  }

  return (
    <BigModal isOpen={props.isOpen} requestClose={props.requestClose}>
      <View style={[{ width: "100%"}, !scanned ? {height: '100%' } : null]}>
        <Text style={[ThemeTypography.h6, {fontWeight: 'bold', marginBottom: 16}]}>Scaneaza un bilet</Text>
        {
          scanned ? renderScanResult() : renderScanner()
        }
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Button
            outlined
            label="Inchide"
            style={{ flex: 1}}
            onPress={props.requestClose}
          />
          {/* <Button
            label="Aplica"
            style={{ flex: 1 }}
            onPress={() => props.requestApply(tempFilters)}
          /> */}
        </View>
      </View>
    </BigModal>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    marginTop: 16,
  },
  profileDetailContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 56,
    paddingBottom: 36,
  },
  profileImageCircle: {
    marginVertical: 8,
    width: 80,
    height: 80,
    position: "relative",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: ThemeColors.primary,
    borderRadius: 200,
    backgroundColor: ThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  profileName: {
    ...ThemeTypography.subtitle1,
    ...ThemeTypographyColorStyles.text_dark_87,
  },
});

export default ScanTicketModal;
