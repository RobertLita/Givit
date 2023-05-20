import { SafeAreaView, FlatList } from "react-native";
import React from "react";
import MarketplaceHeader from "../../components/MarketplaceHeader";
import Donation from "../../components/Donation";

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
    <SafeAreaView style={{ flex: 1 }} className="bg-white ">
      <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={DATA}
        renderItem={({ item, index }) => (
          <Donation
            key={index}
            category="PERSONAL"
            name="Jucarie de plus"
            status="AVAILABLE"
            condition="ACCEPTABLE"
            username="robert"
            date="2023-05-04"
            className="bg-gray-100 h-64 my-2 rounded-md border border-gray-300 flex-row w-11/12"
          />
        )}
        ListHeaderComponent={MarketplaceHeader}
      />
    </SafeAreaView>
  );
};

export default Marketplace;
