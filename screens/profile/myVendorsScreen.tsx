import VendorCard from '@screens/vendors/vendor-card';
import { ProfileStackNavigationPropChild, ProfileStackRoutePropChild } from '@navigation/profileStack';
import { useFocusEffect } from '@react-navigation/native';
import useVendorsApi, { Vendor } from 'api/vendors';
import React, { useCallback, useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList, RefreshControl } from 'react-native'

type MyVendorsScreenNavigationProp = ProfileStackNavigationPropChild<"MyVendors">;
type MyVendorsScreenRouteProp = ProfileStackRoutePropChild<"MyVendors">;

type Props = {
  navigation: MyVendorsScreenNavigationProp;
  route: MyVendorsScreenRouteProp;
};

const MyVendorsScreen = ({ navigation }: Props) => {
  const { getMyVendors } = useVendorsApi();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<Vendor[]>([]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const refresh = useCallback(
    async () => {
      setIsRefreshing(true);

      const result = await getMyVendors();
      setData(result);

      setIsRefreshing(false);
    },
    []
  );
  
  const renderItem = useCallback(
    ({ item, index }: { item: Vendor; index: number }) => (
      <VendorCard
        vendor={item}
        onPress={() =>
          navigation.push("Vendor", { id: item.id, name: item.name })
        }
      ></VendorCard>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + Math.random().toString()}
        keyboardShouldPersistTaps="always"
      />
    </SafeAreaView>
  )
}

export default MyVendorsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
