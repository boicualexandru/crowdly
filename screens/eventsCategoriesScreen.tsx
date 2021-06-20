import { EventCategoryType } from "api/events";
import React from "react";
import { StyleSheet, Text, Image, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  EventsStackNavigationPropChild,
  EventsStackRoutePropChild,
} from "@navigation/eventsStack";

import { ThemeBoxing } from "@theme/theme-boxing";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

const categoriesLabels = [
  {
    label: "Petreceri",
    type: EventCategoryType.Party,
    image:
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    label: "Concerte",
    type: EventCategoryType.Music,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    label: "Comedie",
    type: EventCategoryType.Comedy,
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    label: "Arta",
    type: EventCategoryType.Art,
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    label: "Stil de Viata",
    type: EventCategoryType.Lifestyle,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1931&q=80",
  },
  {
    label: "Comunitate",
    type: EventCategoryType.Comunity,
    image:
      "https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
  },
  {
    label: "Corporative",
    type: EventCategoryType.Corporate,
    image:
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
  },
  {
    label: "Personale",
    type: EventCategoryType.Personal,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];

type EventsCategoriesScreenNavigationProp = EventsStackNavigationPropChild<"EventsCategories">;
type EventsCategoriesScreenRouteProp = EventsStackRoutePropChild<"EventsCategories">;

interface Props {
  navigation: EventsCategoriesScreenNavigationProp;
  route: EventsCategoriesScreenRouteProp;
}

const EventsCategoriesScreen = ({ navigation }: Props) => {
  return (
    <ScrollView 
      contentContainerStyle={ThemeBoxing.container}
      keyboardShouldPersistTaps="always"
    >
      {categoriesLabels.map((category) => (
        <Pressable
          style={styles.categoryContainer}
          onPress={() =>
            navigation.push("Events", {
              categoryType: category.type,
              categoryName: category.label,
            })
          }
          key={category.label}
        >
          <Image
            source={{
              uri: category.image,
            }}
            style={styles.bgImage}
          />
          <Text style={styles.text}>{category.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default EventsCategoriesScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    width: "100%",
    aspectRatio: 7 / 3,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    elevation: 3,
  },
  bgImage: {
    width: "100%",
    aspectRatio: 7 / 3,
    position: "absolute",
    opacity: 0.5,
  },
  text: {
    ...ThemeTypography.h5,
    ...ThemeTypographyColorStyles.text_white,
    textTransform: "uppercase",
    letterSpacing: 4,
    fontWeight: "600",
  },
});
