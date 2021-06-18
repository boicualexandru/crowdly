import IconButton from '@components/button/icon-button'
import MapImage from '@components/map-image/map-image'
import { EventScreenNavigationProp } from '@screens/event/eventScreen'
import { ThemeBoxing } from '@theme/theme-boxing'
import ThemeColors from '@theme/theme-colors'
import { ThemeTypography, ThemeTypographyColorStyles } from '@theme/theme-typography'
import { EventDetails } from 'api/events'
import React from 'react'
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

interface Props {
  event: EventDetails;
  navigation: EventScreenNavigationProp;
}

const EventAbout = ({ event }: Props) => {
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
