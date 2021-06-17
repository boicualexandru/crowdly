import { VendorCategoryType } from "api/vendors";
import React from "react";
import { StyleSheet, Text, Image, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  VendorsStackNavigationPropChild,
  VendorsStackRoutePropChild,
} from "@navigation/vendorsStack";

import { ThemeBoxing } from "@theme/theme-boxing";
import {
  ThemeTypography,
  ThemeTypographyColorStyles,
} from "@theme/theme-typography";

const categoriesLabels = [
  {
    label: "Locatii",
    type: VendorCategoryType.Location,
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    label: "Muzica",
    type: VendorCategoryType.Music,
    image:
      "https://images.unsplash.com/photo-1531425918464-838093179bd4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
  },
  {
    label: "Photo",
    type: VendorCategoryType.Photo,
    image:
      "https://images.unsplash.com/photo-1544981735-983664b25436?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    label: "Video",
    type: VendorCategoryType.Video,
    image:
      "https://images.unsplash.com/photo-1614036742146-6e9bb0a163d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=949&q=80",
  },
  {
    label: "Catering",
    type: VendorCategoryType.Food,
    image:
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
  },
  {
    label: "Divertisment",
    type: VendorCategoryType.Entertainment,
    image:
      "https://images.unsplash.com/photo-1519758965401-328f73031806?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    label: "Decoratiuni",
    type: VendorCategoryType.Decoration,
    image:
      "https://images.unsplash.com/photo-1617201460038-6e5555a8a1f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
  },
  {
    label: "Aranjamente Florale",
    type: VendorCategoryType.Flowers,
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];

type VendorsCategoriesScreenNavigationProp = VendorsStackNavigationPropChild<"VendorsCategories">;
type VendorsCategoriesScreenRouteProp = VendorsStackRoutePropChild<"VendorsCategories">;

interface Props {
  navigation: VendorsCategoriesScreenNavigationProp;
  route: VendorsCategoriesScreenRouteProp;
}

const VendorsCategoriesScreen = ({ navigation }: Props) => {
  return (
    <ScrollView 
      contentContainerStyle={ThemeBoxing.container}
      keyboardShouldPersistTaps="always"
    >
      {categoriesLabels.map((category) => (
        <Pressable
          style={styles.categoryContainer}
          onPress={() =>
            navigation.push("Vendors", {
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

export default VendorsCategoriesScreen;

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
