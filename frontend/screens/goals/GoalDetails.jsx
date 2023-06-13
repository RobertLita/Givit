import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import Requirement from "../../components/Requirement";
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

const GoalDetails = ({ id, name }) => {
  return (
    <SafeAreaView className="bg-white items-center " style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={DATA}
        renderItem={({ item, index }) => (
          <Requirement
            key={index}
            name="Ghiozdan scolar"
            description="Copiii au nevoie de un ghiozdan mare pentru scoala"
          />
        )}
        ListHeaderComponent={<ListHeader title={name} />}
      />
    </SafeAreaView>
  );
};

export default GoalDetails;
