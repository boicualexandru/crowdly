import React from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  ViewStyle,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Swiper from "react-native-swiper";
import { Colors } from "react-native-ui-lib";

export interface ImageSwiperProps extends ViewProps {
  images: string[];
  imageWidth?: number;
  imageHeight?: number;
  ratio?: number;
  sliderWidth?: number;
  imageWrapperStyle?: ViewStyle;
  onPress?: () => void;
}

const windowWidth = Dimensions.get("window").width;

const ImageSwiper = (props: ImageSwiperProps) => {
  if (!(props.images && props.images.length)) return null;

  const ratio = props.ratio || 16.0 / 9;
  const imageWidth = props.imageWidth || windowWidth;
  let imageHeight = props.imageHeight || imageWidth / ratio;
  imageHeight = Math.min(imageHeight, 500);

  const sliderWidth = props.sliderWidth || imageWidth;

  const slideContent = (item: string, index: number) => (
    <View
      key={index}
      style={[
        { width: imageWidth, height: imageHeight },
        props.imageWrapperStyle,
      ]}
    >
      <Image
        source={{ uri: item }}
        style={{ width: imageWidth, height: imageHeight, aspectRatio: ratio }}
      />
    </View>
  );

  const slide = (item: string, index: number = 0) => {
    if (!props.onPress) return slideContent(item, index);

    return (
      <TouchableWithoutFeedback key={index} onPress={props.onPress}>
        {slideContent(item, index)}
      </TouchableWithoutFeedback>
    );
  };

  if (props.images.length === 1) {
    return <View style={props.style}>{slide(props.images[0])}</View>;
  }

  return (
    <View style={[{ height: imageHeight }, props.style]}>
      <Swiper
        showsButtons={false}
        dotStyle={{
          backgroundColor: Colors.white,
          height: 6,
          width: 6,
          opacity: 0.4,
          elevation: 4,
        }}
        activeDotStyle={{ backgroundColor: Colors.white, elevation: 4 }}
        paginationStyle={{ bottom: 8 }}
      >
        {props.images.map(slide)}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderWrapper: {
    alignSelf: "center",
  },
});

export default ImageSwiper;
