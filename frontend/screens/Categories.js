import { View, Text, SafeAreaView, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const data = {
  CLOTHING: "tshirt-crew",
  ELECTRONICS: "headphones",
  HOUSEHOLD: "table-furniture",
  TOYS: "teddy-bear",
  MEDIA: "book-open-variant",
  SPORT: "basketball",
  SCHOOL: "school",
};

const headerTitle = () => {
  return (
    <Text className="font-bold text-3xl text-black ml-4 mb-6">
      All categories
    </Text>
  );
};

const Categories = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <FlatList
        ListHeaderComponent={headerTitle}
        data={Object.entries(data)}
        renderItem={({ item, index }) => (
          <View
            className="bg-red-400 w-11/12 h-16 mx-4 my-4 justify-around items-center flex-row rounded-md"
            key={index}
          >
            <MaterialCommunityIcons name={item[1]} size={50} color="white" />
            <Text className="font-semibold text-base w-1/2">{item[0]}</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={30}
              color="black"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

export default Categories;
