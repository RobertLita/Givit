import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import Goal from "./Goal";
import ListHeader from "../../components/ListHeader";

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

const Goals = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white items-center">
      <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          alignItems: "center",
          width: "100%",
        }}
        data={DATA}
        renderItem={({ item, index }) => (
          <Goal
            key={index}
            title="School for a family"
            description="There is a poor family from Valcea with 2 children who need education"
          />
        )}
        ListHeaderComponent={<ListHeader title="Goals" />}
      />
    </SafeAreaView>
  );
};

export default Goals;
