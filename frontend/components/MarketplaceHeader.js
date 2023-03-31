import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
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

const MarketplaceHeader = () => {
  // fetch categories
  const navigation = useNavigation();
  return (
    <View className="w-2/3 justify-start">
      <View className="justify-between">
        <View className="justify-between w-screen items-center flex-row">
          <Text className="font-bold text-2xl text-black ml-4">Categories</Text>
          <Text
            className="text-base text-gray-600 mr-4"
            onPress={() => {
              navigation.navigate("Categories");
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
        {Object.entries(data).map(([key, value]) => (
          <View
            className="items-center justify-center"
            onPress={() => {
              // filter data + highlight container
            }}
          >
            <View className="bg-red-400 w-28 h-28 mx-3 rounded-full items-center justify-center">
              <MaterialCommunityIcons
                key={key}
                name={value}
                size={50}
                color="white"
              />
            </View>
            <Text className="text-sm font-bold mt-2">{key}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MarketplaceHeader;
