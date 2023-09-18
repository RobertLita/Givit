import { SafeAreaView, FlatList, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MarketplaceHeader from "../../components/MarketplaceHeader";
import Donation from "../../components/Donation";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const Categories = [
  "CLOTHING",
  "ELECTRONICS",
  "HOUSEHOLD",
  "TOYS",
  "MEDIA",
  "SPORT",
  "SCHOOL",
  "PERSONAL",
  "NONE",
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState(8);
  const isFocused = useIsFocused();
  const route = useRoute();
  const [refresh, setRefresh] = useState(false);
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = route.params;
      try {
        const response = await axios.get(
          ` https://83a9-80-96-21-160.ngrok-free.app/marketplace/filtered?category=${Categories[selectedCategory]}&skip=0&limit=100`
        );
        setObjects(response.data);
      } catch (e) {
        console.log(e.request);
      }
    };
    fetchData();
  }, [selectedCategory, isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white ">
      <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={objects}
        renderItem={({ item, index }) => {
          return (
            <Donation
              key={index}
              id={item.id}
              category={item.category}
              name={item.name}
              status={item.status}
              condition={item.condition}
              image={item.image}
              date={item.date}
              className="bg-gray-100 h-64 my-2 rounded-md border border-gray-300 flex-row w-11/12"
            />
          );
        }}
        ListHeaderComponent={
          <MarketplaceHeader
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        }
      />
      {objects.length === 0 && (
        <View className="justify-center items-center absolute top-80 left-0 right-0">
          <Text className="text-xl">No donations with this category!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Marketplace;
