import React from "react";
import { Image } from "react-native";

import ThemeColors from "@theme/theme-colors";

interface Props {
  width?: number | string;
  aspectRatio?: number;
  lon: number;
  lat: number;
}

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
          .toLowerCase()};size:x-large&apiKey=1b48259b810e48ddb151889f9ea58db0`,
      }}
      style={{
        width: props.width ?? "100%",
        aspectRatio: props.aspectRatio ?? 1,
      }}
    />
  );
};

export default MapImage;
