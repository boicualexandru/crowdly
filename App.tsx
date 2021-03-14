import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EventCard, { EventCardProps } from './components/event-card/event-card';

export default function App() {
  const renderItem = ({ item }: { item: EventCardProps }) => (
    <EventCard {...item}></EventCard>
  )
  return (
    <View style={{ ...styles.container, flex: 1 }}>
      {/* <Text>Open up App.tsx to start working on your app 3!</Text> */}
      <FlatList
        data={[1,2,3,4,5,6,7,8,9].map((x, i) => ({
          id: i + '',
          title: 'Targ de cariere pentru tineri',
          date: 'Mie, 2 Aug • 17:00',
          city: 'Sibiu, Romania',
          price: '20 Lei',
          imageUrl: 'https://images.unsplash.com/photo-1615646549461-b9b9c118f300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'
        }))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{width: '100%'}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
