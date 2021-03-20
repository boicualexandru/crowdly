import React from "react";
import { View, Text, Card } from "react-native-ui-lib";
import { FontAwesome5 } from "@expo/vector-icons";
import ThemeColors from "@theme/theme-colors";

export interface EventModel {
  id: string;
  title: string;
  date?: string;
  city?: string;
  imageUrl?: string;
  price: string;
}

interface Props {
  event: EventModel;
  onPress: () => void;
}

const EventCard = ({ event, onPress }: Props) => {
  return (
    <Card
      key={event.id}
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
          uri: event.imageUrl,
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
              {event.date}
            </Text>
            <Text text70 grey10>
              {event.title}
            </Text>

            <View row>
              <View style={{ marginRight: 8 }}>
                <Text text90 grey50>
                  <FontAwesome5
                    name="map-marker-alt"
                    color="#ccc"
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
          <Text text70 grey10>
            {event.price}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default EventCard;
