import { Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Reward from "../../components/Reward";

const UserRewards = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Text className="font-bold text-3xl text-black ml-4 mb-6">
        Your reviews
      </Text>
      <ScrollView
        className="w-full"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Reward
          title="First Donation!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum, tortor at fringilla volutpat."
          amount={1}
        />
        <Reward
          title="First Donation!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum, tortor at fringilla volutpat."
          amount={1}
        />
        <Reward
          title="First Donation!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum, tortor at fringilla volutpat."
          amount={1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserRewards;
