import Button from '@components/button/button'
import IconButton from '@components/button/icon-button'
import MapImage from '@components/map-image/map-image'
import { EventScreenNavigationProp } from '@screens/event/eventScreen'
import { ThemeBoxing } from '@theme/theme-boxing'
import ThemeColors from '@theme/theme-colors'
import { ThemeTypography, ThemeTypographyColorStyles } from '@theme/theme-typography'
import { EventDetails } from 'api/events'
import { useTicketApi } from 'api/ticket'
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import ScanTicketModal from './scanTicketModal'

interface Props {
  event: EventDetails;
  navigation: EventScreenNavigationProp;
}

const EventAbout = ({ event }: Props) => {
  const [isScanTicketModalOpen, setIsScanTicketModalOpen] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      keyboardShouldPersistTaps="always"
    >
      <View style={ThemeBoxing.container}>
        {
          event.isEditable ? 
          <View style={{width: '100%', marginBottom: 16}}>
            <Button
              label="Scaneaza un Bilet"
              onPress={() => setIsScanTicketModalOpen(true)}
              leftIcon="qrcode"
              iconTheme="FontAwesome5"
            />
          </View> : null
        }
        <View>
          <Text
            style={[
              ThemeTypography.body1,
              ThemeTypographyColorStyles.text_dark_87,
            ]}
          >
            {event.description}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          {
            event.phone ?
            <View style={styles.button}>
              <IconButton
                icon="phone"
                color={ThemeColors.white}
                backgroundColor={ThemeColors.primary}
                onPress={() => Linking.openURL(`tel:${event.phone}`)}
              />
            </View> : null
          }
          {
            event.email ?
            <View style={styles.button}>
              <IconButton
                icon="envelope"
                color={ThemeColors.white}
                backgroundColor={ThemeColors.primary}
                onPress={() => Linking.openURL(`mailto:${event.email}`)}
              />
            </View> : null
          }
          {
            event.latitude && event.longitude ?
            <View style={styles.button}>
              <IconButton
                icon="map"
                color={ThemeColors.white}
                backgroundColor={ThemeColors.primary}
                onPress={() =>
                  Linking.openURL(
                    `http://www.google.com/maps/place/${event.latitude},${event.longitude}`
                  )
                }
              />
            </View> : null
          }
        </View>
      </View>
      {event.longitude && event.latitude ? (
        <Pressable
          onPress={() =>
            Linking.openURL(
              `http://www.google.com/maps/place/${event.latitude},${event.longitude}`
            )
          }
        >
          <MapImage lon={event.longitude} lat={event.latitude} aspectRatio={6 / 4} />
        </Pressable>
      ) : null}
      <ScanTicketModal isOpen={isScanTicketModalOpen} eventId={event.id} requestClose={() => setIsScanTicketModalOpen(false)} />
    </ScrollView>
  )
}

export default EventAbout

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
    width: "100%",
  },
  button: {
    marginHorizontal: 8,
  },
});
