import { StyleSheet } from "react-native";

import { alpha } from "./mixins";
import ThemeColors from "./theme-colors";

export const ThemeTypography = StyleSheet.create({
  cardTitle: { fontSize: 58, fontWeight: "300", lineHeight: 80 },
  cardSubtitle: { fontSize: 58, fontWeight: "300", lineHeight: 80 },
  h1: {
    fontFamily: "Roboto",
    fontWeight: "200",
    fontSize: 96,
    letterSpacing: -1.5,
  },
  h2: {
    fontFamily: "Roboto",
    fontWeight: "200",
    fontSize: 60,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: "Roboto",
    fontSize: 48,
  },
  h4: {
    fontFamily: "Roboto",
    fontSize: 34,
    letterSpacing: 0.25,
  },
  h5: {
    fontFamily: "Roboto",
    fontSize: 24,
  },
  h6: {
    fontFamily: "Roboto",
    fontSize: 20,
    letterSpacing: 0.15,
  },
  subtitle1: {
    fontFamily: "Roboto",
    fontSize: 16,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontFamily: "Roboto",
    fontSize: 14,
    letterSpacing: 0.1,
  },
  body1: {
    fontFamily: "Roboto",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  body2: {
    fontFamily: "Roboto",
    fontSize: 14,
    letterSpacing: 0.25,
  },
  caption: {
    fontFamily: "Roboto",
    fontSize: 12,
    letterSpacing: 0.4,
  },
  overline: {
    fontFamily: "Roboto",
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});

export const ThemeTypographyColorStyles = StyleSheet.create({
  text_dark_87: {
    color: alpha(ThemeColors.black, 0.87),
  },
  text_dark_60: {
    color: alpha(ThemeColors.black, 0.6),
  },
  text_white: {
    color: ThemeColors.white,
  },
  text_primary: {
    color: ThemeColors.primary,
  },
  text_primary_light: {
    color: alpha(ThemeColors.primary, 0.6),
  },
});
