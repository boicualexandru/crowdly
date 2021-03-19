import React from "react";
import { View, Text, Card } from "react-native-ui-lib";
import ThemeColors from "../../common/theme/theme-colors";
import { FontAwesome5 } from "@expo/vector-icons";

export interface EventCardProps {
  id: string;
  title: string;
  date?: string;
  city?: string;
  imageUrl?: string;
  price: string;
  onPress: () => void;
}

const EventCard = (props: EventCardProps) => {
  return (
    <Card
      key={props.id}
      marginV-10
      flex
      selected={false}
      onPress={props.onPress}
      activeOpacity={1}
      marginH-20
      style={{ height: "100%" }}
    >
      <Card.Section
        imageSource={{
          uri: props.imageUrl,
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
              {props.date}
            </Text>
            <Text text70 grey10>
              {props.title}
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
                  {props.city}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text text70 grey10>
            {props.price}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default EventCard;
