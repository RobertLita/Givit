import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import React from "react";

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
];

const headerTitle = () => {
  return (
    <Text className="font-bold text-2xl text-black ml-4 mt-12">
      All categories
    </Text>
  );
};

const Categories = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <FlatList
        ListHeaderComponent={headerTitle}
        data={DATA}
        renderItem={({ item }) => (
          <View className="bg-green-400 w-11/12 h-28 mx-4" />
        )}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={{
          alignItems: "center",
        }}
      />
    </SafeAreaView>
  );
};

export default Categories;
