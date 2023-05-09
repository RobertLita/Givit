import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Review from "../../components/Review";

const UserReviews = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Text className="font-bold text-3xl text-black ml-4 mb-6">
        Your reviews
      </Text>
      <ScrollView
        className="w-full"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Review />
        <Review />
        <Review />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserReviews;
