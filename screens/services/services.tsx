import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import EventCard, {
  EventCardProps,
} from "../../components/event-card/event-card";
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

const DATA = [
  {
    id: 1,
    title: "Targ de cariere pentru tineri",
    date: "Mie, 2 Aug • 17:00",
    city: "Sibiu, Romania",
    price: "20 Lei",
    imageUrl:
      "https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
  },{
    id: 2,
    title: "Targ de cariere pentru tineri",
    date: "Mie, 2 Aug • 17:00",
    city: "Sibiu, Romania",
    price: "20 Lei",
    imageUrl:
      "https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
  }
]

const ServicesScreen = ({navigation}: Props) => {

  const renderItem = ({ item }: { item: EventCardProps }) => (
    <EventCard
      {...item} 
      onPress={() => navigation.navigate("Service", { id: item.id })}
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
