import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import MarketplaceHeader from "../components/MarketplaceHeader";
import Donation from "../components/Donation";

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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          alignItems: "center",
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={DATA}
        renderItem={({ item, index }) => (
          <Donation
            key={index}
            name="Jucarie de plus"
            status="NEW"
            condition="VERY GOOD"
            username="robert"
            className="bg-gray-100 h-60 my-2 rounded-md border border-gray-300"
            style={{ width: "48%" }}
          />
        )}
        // getItemLayout={(data, index) => ({
        //   length: 160,
        //   offset: 160 * index,
        //   index,
        // })}
        ListHeaderComponent={MarketplaceHeader}
      />
    </SafeAreaView>
  );
};

export default Marketplace;
