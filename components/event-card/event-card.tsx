import React from "react";
import { View, Text, Card } from "react-native-ui-lib";
import ThemeColors from "../../common/theme/theme-colors";
import Button from "../button/button";

export interface EventCardProps {
  id: string;
  title: string;
  date?: string;
  city?: string;
  imageUrl?: string;
  price: string;
}

const EventCard = (props: EventCardProps) => {
  return (
    <Card
      key={props.id}
      marginV-10
      flex
      selected={false}
      onPress={() => {}}
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
      <View padding-16>
        <View>
          <Text text90 style={{ color: ThemeColors.primary }}>
            {props.date}
          </Text>
          <Text text70 grey10>
            {props.title}
          </Text>
          <Text text90 grey50>
            {props.city}
          </Text>
        </View>
        <View
          paddingT-8
          row
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Text text70 grey10>
            {props.price}
          </Text>
          <Button label="Participa" />
        </View>
      </View>
    </Card>
  );
};

export default EventCard;
