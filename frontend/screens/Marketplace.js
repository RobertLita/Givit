import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
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

const getCategories = () => {
  const navigation = useNavigation();
  return (
    <View className="w-2/3">
      <View>
        <View className="justify-between w-screen items-center flex-row mt-12">
          <Text className="font-bold text-2xl text-black ml-4">Categories</Text>
          <Text
            className="text-base text-gray-600 mr-4"
            onPress={() => {
              navigation.navigate("");
            }}
          >
            See all
          </Text>
        </View>
        <View className="items-center">
          <View
            className="w-11/12 mt-3"
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 2,
            }}
          ></View>
        </View>
      </View>
      {/* <View> */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <View className="bg-black w-28 h-28 mx-2"></View>
        <View className="bg-red-400 w-28 h-28 mx-2"></View>
        <View className="bg-blue-400 w-28 h-28 mx-2"></View>
        <View className="bg-green-400 w-28 h-28 mx-2"></View>
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

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
        ListHeaderComponent={getCategories}
      />
    </SafeAreaView>
  );
};

export default Marketplace;
