import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Service } from "@models/services/service";
import { ThemeTypography, ThemeTypographyColorStyles } from "@theme/theme-typography";
import ImageSwiper from "@components/image-swiper/image-swiper";
import { ServicesStackNavigationPropChild, ServicesStackRoutePropChild } from "@navigation/services-stack";
import IconButton from "@components/button/icon-button";
import ThemeColors from "@theme/theme-colors";

type ServiceScreenNavigationProp = ServicesStackNavigationPropChild<"Service">;
type ServiceScreenRouteProp = ServicesStackRoutePropChild<"Service">;

interface Props {
  navigation: ServiceScreenNavigationProp;
  route: ServiceScreenRouteProp;
}

const useServiceState = (
  navigation: ServiceScreenNavigationProp
): [Service | undefined, (service: Service) => void] => {
  const [service, setServiceValue] = useState<Service>();

  const setService = (service: Service) => {
    navigation.setOptions({
      title: service?.name,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="heart"
          solid={service?.isFavourite}
          color={ThemeColors.primary}
          onPress={() =>
            setService({ ...service, isFavourite: !service.isFavourite })
          }
        />
      ),
    });

    return setServiceValue(service);
  };

  return [service, setService];
};

const ServiceScreen = ({ navigation, route }: Props) => {
  const { id, name } = route.params;

  const [service, setService] = useServiceState(navigation);

  useEffect(() => {
    setService({
      id: id,
      city: "Cluj-Napoca",
      email: "test@test.com",
      images: [
        "https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
        "https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
      ],
      name: name,
      tel: "1234",
      isFavourite: false,
    });
  }, [route.params]);

  if (service == null) return null;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          alignContent: "flex-start",
        }}
      >
        <ImageSwiper images={service.images} />

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionContent}>
            <Text
              style={[
                ThemeTypography.h5,
                ThemeTypographyColorStyles.text_dark_87,
              ]}
            >
              {service.name}
            </Text>
            <Text
              style={[
                ThemeTypography.caption,
                ThemeTypographyColorStyles.text_dark_60,
              ]}
            >
              {service.city}
            </Text>
          </View>
          {/* <ReviewStars {...service.rating} style={Spacing.mt_4} /> */}
        </View>
        {/* <LocationTabsContainer screenProps={service} style={{ flex: 1, width: '100%', alignSelf: 'stretch', backgroundColor: 'blue' }} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  descriptionContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default ServiceScreen;
