import React, { useEffect } from "react";
import { FlatList, RefreshControl, SafeAreaView, StyleSheet } from "react-native";

import {
  ServicesStackNavigationPropChild,
  ServicesStackRoutePropChild,
} from "@navigation/services-stack";

import { getServices, ServiceDTO } from "api/services";
import ServiceCard from "@components/service-card/service-card";
import useAsync from "@hooks/useAsync";

type ServicesScreenNavigationProp = ServicesStackNavigationPropChild<"Services">;
type ServicesScreenRouteProp = ServicesStackRoutePropChild<"Services">;

interface Props {
  navigation: ServicesScreenNavigationProp;
  route: ServicesScreenRouteProp;
}

const ServicesScreen = ({ navigation }: Props) => {
  const { execute, status, value: services, error } = useAsync(getServices);

  useEffect(() => { execute(); }, [])

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
        refreshControl={<RefreshControl refreshing={status == "pending"} onRefresh={execute} />}
        data={services || []}
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
