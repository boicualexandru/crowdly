import IconButton from '@components/button/icon-button'
import ThemeColors from '@theme/theme-colors';
import { getVideoThumbnail, getYoutubeVideoId } from 'common/helpers/youtube-thumbnail-helper'
import React from 'react'
import { View, Modal, StyleSheet, Image, TouchableWithoutFeedback, Linking, Dimensions, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper';

export interface FullScreenSwiperModalProps {
  images: string[];
  index?: number;
  visible: boolean;
  onClose: () => void;
}

const windowHeight = Dimensions.get('window').height;

const FullScreenSwiperModal = (props: FullScreenSwiperModalProps) => {
  const imageSlide = (image: string, index?: number) => {
    return (
      <View style={styles.slide} key={index}>
        <Image source={{ uri: image }} resizeMode="contain" style={{ flex: 1, width: '100%', /* height: null */ }} />
      </View>
    )
  }

  const videoSlide = (thumbnail: string, videoUrl: string, index?: number) => {
    return (
      <TouchableWithoutFeedback onPress={() => Linking.openURL(videoUrl)} key={index}>
        <View style={styles.slide}>
          <Image source={{ uri: thumbnail }} resizeMode="contain" style={{ flex: 1, width: '100%', /* height: null */ }} />
          <View style={styles.playButtonWrapper}>
            <IconButton icon="play-circle-outline" onPress={() => Linking.openURL(videoUrl)} /*iconStyle={styles.playButtonIcon} *//>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const slide = (image: string, index?: number) => {
    const youtubeVideoId = getYoutubeVideoId(image);
    return youtubeVideoId ? 
      videoSlide(getVideoThumbnail(youtubeVideoId), image, index) : 
      imageSlide(image, index);
  }
  
  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      onRequestClose={props.onClose}
      onDismiss={props.onClose}
      transparent={false}
      presentationStyle="fullScreen" >
      <View>
        <View style={{ height: windowHeight - (StatusBar.currentHeight ?? 0) }}>
          <Swiper showsButtons={false}
            dotStyle={{ backgroundColor: ThemeColors.white, height: 6, width: 6, opacity: 0.4, elevation: 4 }}
            activeDotStyle={{ backgroundColor: ThemeColors.white, elevation: 4 }}
            paginationStyle={{ bottom: 8 }}
            index={props.index || 0}>
            {
              props.images.map(slide)
            }
          </Swiper>
          
          <IconButton icon="close" onPress={props.onClose} /* style={styles.closeButton} iconStyle={styles.closeButtonIcon} *//>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute', 
    top: 0, 
    right: 0
  },
  closeButtonIcon: {
    color: '#fff', 
    elevation: 4
  },
  playButtonWrapper: {
    position: 'absolute',
    flex: 1,
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    color: '#fff', 
    fontSize: 56,
    elevation: 4
  }
})

export default FullScreenSwiperModal;
