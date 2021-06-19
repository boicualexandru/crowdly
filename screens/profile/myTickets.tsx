import BigModal from '@components/modal/big-modal';
import { ProfileStackNavigationPropChild, ProfileStackRoutePropChild } from '@navigation/profileStack';
import { useFocusEffect } from '@react-navigation/native';
import ThemeColors from '@theme/theme-colors';
import { Ticket, useTicketApi } from 'api/ticket';
import React, { useCallback, useState } from 'react'
import { FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg';

type MyTicketsScreenNavigationProp = ProfileStackNavigationPropChild<"MyTickets">;
type MyTicketsScreenRouteProp = ProfileStackRoutePropChild<"MyTickets">;

type Props = {
  navigation: MyTicketsScreenNavigationProp;
  route: MyTicketsScreenRouteProp;
};

const MyTicketsScreen = () => {
  const { getTicketsByUser } = useTicketApi();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<Ticket[]>([]);
  const [modalOpenForTicket, setModalOpenForTicket] = useState<Ticket | null>(null);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );
  
  const refresh = useCallback(
    async () => {
      setIsRefreshing(true);

      const result = await getTicketsByUser();
      setData(result);

      setIsRefreshing(false);
    },
    []
  );
  
  const renderItem = useCallback(
    ({ item, index }: { item: Ticket; index: number }) => (
      <Pressable
        style={styles.ticketCard}
        onPress={() => setModalOpenForTicket(item)}
      >
        <Text>{item.eventName}</Text>
      </Pressable>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refresh()}
          />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + Math.random().toString()}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="always"
      />
      
      <BigModal isOpen={modalOpenForTicket != null} requestClose={() => setModalOpenForTicket(null)}>
        <View style={{ width: "100%", alignItems: 'center' }}>
          {
            modalOpenForTicket ?
            <QRCode
              size={200}
              value={JSON.stringify({
                eventId: modalOpenForTicket.eventId,
                ticketId: modalOpenForTicket.id,
              })}
            /> : null
          }
        </View>
      </BigModal>
    </SafeAreaView>
  )
}

export default MyTicketsScreen

const styles = StyleSheet.create({
  ticketCard: {
    width: "100%",
    backgroundColor: ThemeColors.white,
    flexDirection: "row",
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
})
