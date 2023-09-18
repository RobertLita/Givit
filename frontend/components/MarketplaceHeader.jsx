import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";

const data = {
  CLOTHING: "tshirt-crew",
  ELECTRONICS: "headphones",
  HOUSEHOLD: "table-furniture",
  TOYS: "teddy-bear",
  MEDIA: "book-open-variant",
  SPORT: "basketball",
  SCHOOL: "school",
  PERSONAL: "account-multiple",
};

const MarketplaceHeader = ({ selectedCategory, setSelectedCategory }) => {
  const selectCategory = (index) => {
    if (selectedCategory === index) {
      setSelectedCategory(8);
    } else setSelectedCategory(index);
  };
  return (
    <View className="w-2/3 justify-start">
      <View className="justify-between">
        <View className="justify-between w-screen items-center flex-row">
          <Text className="font-bold text-2xl text-black ml-4">Categories</Text>
          {/* <Text
            className="text-base text-gray-600 mr-4"
            onPress={() => {
              navigation.navigate("Categories");
            }}
          >
            See all
          </Text> */}
        </View>
        <View className="items-center">
          <View
            className="w-11/12 mt-3"
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 2,
            }}
          />
        </View>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        {Object.entries(data).map(([key, value], index) => (
          <TouchableOpacity
            className="items-center justify-center"
            style={
              selectedCategory === index && {
                backgroundColor: "lightgray",
                borderRadius: 7,
              }
            }
            onPress={() => {
              selectCategory(index);
            }}
            key={index}
          >
            <View className="bg-red-400 w-20 h-20 mx-3 rounded-full items-center justify-center">
              <MaterialCommunityIcons
                key={key}
                name={value}
                size={45}
                color="white"
              />
            </View>
            <Text className="text-sm font-bold mt-2">{key}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MarketplaceHeader;
