import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  List,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import EventCard, { EventCardProps } from "./components/event-card/event-card";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { default as theme } from "./common/theme/custom-theme.json";

const data = new Array(8).fill({
  id: "asd",
  title: "Targ de cariere pentru tineri",
  date: "Mie, 2 Aug • 17:00",
  city: "Sibiu, Romania",
  price: "20 Lei",
  imageUrl:
    "https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
});

export default function App() {
  const renderItem = ({ item }: { item: EventCardProps }) => (
    <EventCard {...item}></EventCard>
  );

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Layout style={styles.container}>
          <List style={{ width: "100%" }} data={data} renderItem={renderItem} />
        </Layout>
      </ApplicationProvider>
      <StatusBar style="auto" />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
