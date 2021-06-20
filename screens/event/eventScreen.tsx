import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect } from "@react-navigation/native";
import useEventsApi, { EventDetails } from "api/events";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Share } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { PreferencesActionType } from "@context/preferences/preferencesActions";
import { PreferencesContext } from "@context/preferences/preferencesContext";
import {
  EventsStackNavigationPropChild,
  EventsStackRoutePropChild,
} from "@navigation/eventsStack";

import IconButton from "@components/button/icon-button";
import ImageSwiper from "@components/image-swiper/image-swiper";

import ThemeColors from "@theme/theme-colors";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

import EventAbout from "./eventAbout";
import moment from "moment";
import Button from "@components/button/button";
import { useTicketApi } from "api/ticket";

export type EventScreenNavigationProp = EventsStackNavigationPropChild<"Event">;
type EventScreenRouteProp = EventsStackRoutePropChild<"Event">;

interface Props {
  navigation: EventScreenNavigationProp;
  route: EventScreenRouteProp;
}

const useEventState = (
  navigation: EventScreenNavigationProp
): [EventDetails | undefined, (event: EventDetails) => void] => {
  const [event, setEventValue] = useState<EventDetails>();
  const { state, dispatch } = useContext(PreferencesContext);

  const onShare = useCallback(async () => {
    await Share.share({
      message: `${event?.name} \nIntra acum in alpicatia Crowdly pentru a vizualiza mai multe detalii despre acest eveniment.`,
    });
  }, [event?.name]);

  const setEvent = (event: EventDetails) => {
    navigation.setOptions({
      headerLeftContainerStyle: styles.headerButtonsWrapper,
      headerRightContainerStyle: styles.headerButtonsWrapper,
      headerRight: ({ tintColor }) => (
        <View style={{ flexDirection: "row" }}>
          {event.isEditable ? (
            <IconButton
              icon="edit-2"
              color={ThemeColors.textDark}
              theme="Feather"
              size={18}
              onPress={() =>
                navigation.navigate("EditEvent", { eventId: event.id })
              }
            />
          ) : null}
          {/* <IconButton
            icon="heart"
            solid={event.isFavourite}
            color={ThemeColors.primary}
            size={18}
            onPress={() =>
              dispatch({
                type: event.isFavourite
                  ? PreferencesActionType.RemoveEventFromFavorites
                  : PreferencesActionType.AddEventToFavorites,
                payload: {
                  eventId: event.id,
                },
              })
            }
          /> */}
          <IconButton
            icon="share"
            color={ThemeColors.textDark}
            theme="Feather"
            size={18}
            onPress={onShare}
          />
        </View>
      ),
    });

    return setEventValue(event);
  };

  // useEffect(() => {
  //   if (event)
  //     setEvent({
  //       ...event,
  //       isFavourite: state.favoriteEvents?.includes(event.id) ?? false,
  //     });
  // }, [state.favoriteEvents, event?.name]);

  return [event, setEvent];
};

const EventScreen = ({ navigation, route }: Props) => {
  const { id, name } = route.params;

  const [event, setEvent] = useEventState(navigation);
  const { getEventById } = useEventsApi();
  const { book } = useTicketApi();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const eventResponse = await getEventById(id);
        setEvent(eventResponse);
      })();
    }, [route.params])
  );
  
  const getFormattedDate = useCallback(
    (date: Date) => moment(date).format("Do MMM"),
    []
  );

  if (event == null) return null;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          alignContent: "flex-start",
        }}
      >
        <ImageSwiper images={event.images} topGradient ratio={16.0 / 10} />

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionContent}>
            <Text
              style={[
                ThemeTypography.h5,
                ThemeTypographyColorStyles.text_dark_87,
              ]}
            >
              {event.name}
            </Text>
          </View>
          <View>
            <Text style={[ThemeTypography.h6, {color: ThemeColors.primary}]}>
              {event.price} Lei
            </Text>
          </View>
          {/* <ReviewStars {...event.rating} style={Spacing.mt_4} /> */}
        </View>
        <View style={[styles.descriptionContainer, {paddingBottom: 8}]}>
          <View style={styles.descriptionContent}>
            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <FontAwesome5
                style={{ marginRight: 8 }}
                name="calendar"
                color={ThemeColors.textGray}
              ></FontAwesome5>
              <Text
                style={[
                  ThemeTypography.caption,
                  ThemeTypographyColorStyles.text_dark_60,
                ]}
              >
                {getFormattedDate(event.startDateTime)} - {getFormattedDate(event.endDateTime)}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5
                style={{ marginRight: 8 }}
                name="map-marker-alt"
                color={ThemeColors.textGray}
              ></FontAwesome5>
              <Text
                style={[
                  ThemeTypography.caption,
                  ThemeTypographyColorStyles.text_dark_60,
                ]}
              >
                {event.city}
              </Text>
            </View>
          </View>
          <View>
            <Button
              label="Ia un bilet"
              onPress={async () => await book(event.id)}
              leftIcon="tag"
              iconTheme="Feather"
            />
          </View>
          {/* <ReviewStars {...event.rating} style={Spacing.mt_4} /> */}
        </View>
        <EventAbout event={event} navigation={navigation}></EventAbout>
        {/* <LocationTabsContainer screenProps={event} style={{ flex: 1, width: '100%', alignSelf: 'stretch', backgroundColor: 'blue' }} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: ThemeColors.white,
  },
  descriptionContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerButtonsWrapper: {
    backgroundColor: "#ffffffaa",
    elevation: 3,
    borderRadius: 200,
    height: 48,
    // width: 40,
    marginTop: 4,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventScreen;
