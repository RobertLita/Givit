import { SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import MarketplaceHeader from "../../components/MarketplaceHeader";
import Donation from "../../components/Donation";
import axios from "axios";

const Marketplace = () => {
  const [objects, setObjects] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   "http://10.0.2.2:8000/marketplace/?skip=0&limit=100"
        // );
        setObjects(response.data);
      } catch (e) {
        console.log(e.request);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white ">
      <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={objects}
        renderItem={({ item, index }) => (
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
        )}
        ListHeaderComponent={MarketplaceHeader}
      />
    </SafeAreaView>
  );
};

export default Marketplace;
