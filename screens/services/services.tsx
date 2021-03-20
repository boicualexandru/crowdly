import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import EventCard, { EventModel } from "../../common/components/event-card/event-card";
import {
  ServicesStackNavigationPropChild,
  ServicesStackRoutePropChild,
} from "../../navigation/services-stack";

type ServicesScreenNavigationProp = ServicesStackNavigationPropChild<"Services">;
type ServicesScreenRouteProp = ServicesStackRoutePropChild<"Services">;

interface Props {
  navigation: ServicesScreenNavigationProp;
  route: ServicesScreenRouteProp;
}

const DATA: EventModel[] = [
  {
    id: "asd",
    title: "Targ de cariere pentru tineri",
    date: "Mie, 2 Aug • 17:00",
    city: "Sibiu, Romania",
    price: "20 Lei",
    imageUrl:
      "https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
  },
  {
    id: "asd2",
    title: "Targ de carte",
    date: "Mie, 10 Aug • 13:00",
    city: "Brasov, Romania",
    price: "25 Lei",
    imageUrl:
      "https://images.unsplash.com/photo-1595405895473-1adb3f68501a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1868&q=80",
  },
];

const ServicesScreen = ({ navigation }: Props) => {
  const renderItem = ({ item }: { item: EventModel }) => (
    <EventCard
      event={item}
      onPress={() =>
        navigation.navigate("Service", { id: item.id, name: item.title })
      }
    ></EventCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
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
