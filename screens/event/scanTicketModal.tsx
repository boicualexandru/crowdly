import {
  EventsFiltersModel,
} from "api/events";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import Button from "@components/button/button";
import RangeTextField from "@components/form/range-text-field";
import BigModal from "@components/modal/big-modal";
import TextField from "@components/form/text-field";
import DateIntervalField from "@components/form/date-interval-field";
import { ThemeTypography } from "@theme/theme-typography";
import DateField from "@components/form/date-field";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";

interface Props {
  isOpen: boolean;
  eventId: string;
  // requestApply: (data: string) => void;
  requestClose: () => void;
}

const ScanTicketModal = (props: Props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [props.isOpen]);

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BigModal isOpen={props.isOpen} requestClose={props.requestClose}>
      <View style={{ width: "100%", height: '100%' }}>
        <Text style={[ThemeTypography.h6, {fontWeight: 'bold', marginBottom: 16}]}>Scaneaza un bilet</Text>

        <View style={{flex: 1}}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject]}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          />
        </View>
        {scanned && <Button label={'Scaneaza din nou'} onPress={() => setScanned(false)} />}

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
});

export default ScanTicketModal;
