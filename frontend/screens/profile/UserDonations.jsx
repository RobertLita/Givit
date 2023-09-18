import { SafeAreaView, FlatList } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { useAuth } from "../../context/AuthContext";
import Donation from "../../components/Donation";
import ListHeader from "../../components/ListHeader";

const UserDonations = () => {
  const { authState } = useAuth();
  const isFocused = useIsFocused();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://83a9-80-96-21-160.ngrok-free.app/marketplace/${authState.userType}/${authState.userId}?skip=0&limit=100`
        );
        setDonations(response.data);
      } catch (e) {
        console.log(e);
        console.log(e.request);
      }
    };
    fetchData();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white ">
      <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={donations}
        renderItem={({ item, index }) => (
          <Donation
            key={index}
            category={item.category}
            name={item.name}
            status={item.status}
            condition={item.condition}
            username=""
            date={item.date}
            image={item.image}
            id={item.id}
            className="bg-gray-100 h-64 my-2 rounded-md border border-gray-300 flex-row w-11/12"
          />
        )}
        ListHeaderComponent={<ListHeader title="My donations" />}
      />
    </SafeAreaView>
  );
};

export default UserDonations;
