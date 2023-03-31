import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import MarketplaceHeader from "../components/MarketplaceHeader";

const DATA = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "First Item",
  },
  {
    id: "3",
    title: "First Item",
  },
  {
    id: "4",
    title: "First Item",
  },
  {
    id: "5",
    title: "First Item",
  },
  {
    id: "6",
    title: "First Item",
  },
  {
    id: "7",
    title: "First Item",
  },
  {
    id: "8",
    title: "First Item",
  },
  {
    id: "9",
    title: "First Item",
  },
  {
    id: "10",
    title: "First Item",
  },
  {
    id: "11",
    title: "First Item",
  },
  {
    id: "12",
    title: "First Item",
  },
];

const Marketplace = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={DATA}
        renderItem={({ item }) => (
          <View className="bg-green-400 w-5/12 h-28 my-4 mx-4" />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={MarketplaceHeader}
      />
    </SafeAreaView>
  );
};

export default Marketplace;
