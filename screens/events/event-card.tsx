import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, Text, Card } from "react-native-ui-lib";

import ThemeColors from "@theme/theme-colors";
import { Event } from "api/events";

interface Props {
  event: Event;
  onPress: () => void;
}

const EventCard = ({ event, onPress }: Props) => {
  return (
    <Card
      marginV-10
      flex
      selected={false}
      onPress={onPress}
      activeOpacity={1}
      marginH-20
      style={{ height: "100%" }}
    >
      <Card.Section
        imageSource={{
          uri: event.thumbnail,
        }}
        imageStyle={{ height: 130 }}
      />
      <View
        padding-16
        row
        style={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <View>
          <View>
            <Text text90 style={{ color: ThemeColors.primary }}>
              $$$
            </Text>
            <Text text70 grey10 style={{ marginBottom: 4 }}>
              {event.name}
            </Text>

            <View row>
              <View style={{ marginRight: 8, marginBottom: 4 }}>
                <Text text90 grey50>
                  <FontAwesome5
                    name="calendar"
                    color={ThemeColors.textGray}
                  ></FontAwesome5>
                </Text>
              </View>
              <View>
                <Text text90 grey50>
                  12-14 IUN.
                </Text>
              </View>
            </View>
            <View row>
              <View style={{ marginRight: 8 }}>
                <Text text90 grey50>
                  <FontAwesome5
                    name="map-marker-alt"
                    color={ThemeColors.textGray}
                  ></FontAwesome5>
                </Text>
              </View>
              <View>
                <Text text90 grey50>
                  {event.city}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text text70 style={{color: ThemeColors.primary}}>
            {event.price} Lei
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default EventCard;
