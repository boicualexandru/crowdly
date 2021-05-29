import React from "react";
import { Image } from "react-native";

import ThemeColors from "@theme/theme-colors";

interface Props {
  width?: number | string;
  aspectRatio?: number;
  lon: number;
  lat: number;
}

const apiKey = 'af2330df38004112bb28fb4d9bcfa713';

const MapImage = (props: Props) => {
  return (
    <Image
      source={{
        uri: `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${
          props.lon
        },${props.lat}&zoom=15&marker=lonlat:${props.lon},${
          props.lat
        };color:%23${ThemeColors.primary
          .slice(1)
          .toLowerCase()};size:x-large&apiKey=${apiKey}`,
      }}
      style={{
        width: props.width ?? "100%",
        aspectRatio: props.aspectRatio ?? 1,
      }}
    />
  );
};

export default MapImage;
