import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconRegistry,
  Layout,
  List,
  TopNavigation,
  TopNavigationAction,
  Text
} from "@ui-kitten/components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
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

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const BackIcon = (props: any) => (
  <Icon {...props} name='arrow-back'/>
);

const PersonIcon = (props: any) => (
  <Icon {...props} name='person-outline'/>
);

const PlusIcon = (props: any) => (
  <Icon {...props} name='plus' />
);

const EmailIcon = (props: any) => (
  <Icon {...props} name='email-outline'/>
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

export default function App() {
  const navigationState = useBottomNavigationState();

  const renderItem = ({ item }: { item: EventCardProps }) => (
    <EventCard {...item}></EventCard>
  );
  
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        
        <TopNavigation
          accessoryLeft={BackAction}
          title='Application'
          style={{marginTop: StatusBar.currentHeight}}
        />

        <Layout style={styles.container}>
        {/* <Text style={{colo: 40}}/> */}
        <List style={{ width: "100%" }} data={data} renderItem={renderItem} />
        </Layout>

        <BottomNavigation style={styles.bottomNavigation} {...navigationState}>
          <BottomNavigationTab icon={PersonIcon}/>
          <BottomNavigationTab icon={EmailIcon}/>
          <BottomNavigationTab icon={PlusIcon}/>
          <BottomNavigationTab icon={EmailIcon}/>
          <BottomNavigationTab icon={EmailIcon}/>
        </BottomNavigation>

      </ApplicationProvider>
      <ExpoStatusBar style="auto" />
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
  bottomNavigation: {
    // marginVertical: 8,
  },
});
