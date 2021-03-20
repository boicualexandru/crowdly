import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import {
  ServicesStackNavigationPropChild,
  ServicesStackRoutePropChild,
} from "@navigation/services-stack";

import { getServices, ServiceDTO } from "api/services";
import ServiceCard from "@components/service-card/service-card";

type ServicesScreenNavigationProp = ServicesStackNavigationPropChild<"Services">;
type ServicesScreenRouteProp = ServicesStackRoutePropChild<"Services">;

interface Props {
  navigation: ServicesScreenNavigationProp;
  route: ServicesScreenRouteProp;
}

const ServicesScreen = ({ navigation }: Props) => {
  const [services, setServices] = useState<ServiceDTO[]>([]);

  useEffect(() => {
    getServices().then(s => {
      setServices(s);
    });
  }, [])

  const renderItem = ({ item }: { item: ServiceDTO }) => (
    <ServiceCard
      service={item}
      onPress={() =>
        navigation.navigate("Service", { id: item.id, name: item.name })
      }
    ></ServiceCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
});

export default ServicesScreen;
