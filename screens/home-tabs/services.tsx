import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { RootStackParamList } from "../../App";
import EventCard, {
  EventCardProps,
} from "../../components/event-card/event-card";
import { HomeTabsParamList } from "./home-tabs";

type ServicesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabsParamList, "Services">,
  StackNavigationProp<RootStackParamList>
>;

const DATA = new Array(8).fill({
  id: "asd",
  title: "Targ de cariere pentru tineri",
  date: "Mie, 2 Aug • 17:00",
  city: "Sibiu, Romania",
  price: "20 Lei",
  imageUrl:
    "https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
});

const ServicesScreen = () => {
  const renderItem = ({ item }: { item: EventCardProps }) => (
    <EventCard {...item}></EventCard>
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
